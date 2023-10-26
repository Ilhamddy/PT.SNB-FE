
//change above line to import
import db from "../../models";
import config from "../../config/auth.config";
import pool from "../../config/dbcon.query";
import queries from '../../queries/setting/mapsesions';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pasienSignup } from "./authhelper";
import { decrypt, encrypt } from "../../utils/encrypt"

const User = db.user;
const Role = db.role;
const UserPasien = db.users_pasien;
const m_pasien = db.m_pasien

const Op = db.Sequelize.Op;


const signup = async (req, res) => {
  // const logger = res.locals.logger;
  // Save User to Database
  User.create({
    username: req.body.username,
    // email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    objectpegawaifk: req.body.idpegawai
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            id: req.body.roles
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            // res.send({ message: "User was registered successfully!" });
            res.status(200).send({
              msg: 'User Berhasil Didaftarkan',
              code: 200,
              // data: tempres,
              success: true
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          // res.send({ message: "User was registered successfully!" });
          res.status(200).send({
            msg: 'User Berhasil Didaftarkan',
            code: 200,
            // data: tempres,
            success: true
          });
        });
      }
    })
    .catch(err => {
      // res.status(500).send({ message: err.message });
      res.status(201).send({
        success: false,
        msg: err.message,
        code: 201
      });
    });
};

const signin = async (req, res) => {
  const logger = res.locals.logger;
  try{
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
  
    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
  
    if (!passwordIsValid) {
      return res.status(200).send({
        accessToken: null,
        message: "Invalid Password!",
        data: "Invalid Password!",
        status: "errors"
      });
    }
  
    const result = await pool.query(queries.getSesions, [user.id]);
      // res.status(200).send(result.rows);
    var resHead = result.rows;

    let token = jwt.sign({ id: user.id, sesion: resHead, idpegawai: user.objectpegawaifk, }, config.secret, {
      expiresIn: 86400 // 24 hours test
    });

    let authorities = [];
    const roles = await user.getRoles()
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      // roles: authorities,
      accessToken: token,
      status: "success",
      success: true,
      // sesion: resHead
    });
  }catch(e){
    logger.error(e);
    res.status(500).send({ message: e, status: "errors" });
  }


  
  

};

const signinPasien = async (req, res) => {
  const logger = res.locals.logger;
  try {
    res.locals.showBodyRes()
    const { nocm, noidentitas, clientSecret } = req.body;
    await db.sequelize.transaction(async (transaction) => {
      let user = await UserPasien.findOne({
        where: {
          norm: nocm
        }
      })
      if (!user) {
        // sign up dulu kalau datanya sudah ada di m_pasien
        user = await pasienSignup(req, res, transaction, {
          norm: nocm,
          noidentitas: noidentitas
        })
      }
      if (!user) {
        res.status(404).send({ msg: "User Not found." })
        return
      }
      await user.update({
        clientsecret: clientSecret
      }, {
        transaction: transaction
      })
      const pasien = await m_pasien.findOne({
        where: {
          [Op.or]: [
            {
              nocm: nocm
            },
            {
              nocmtemp: nocm
            }]
        }
      })
      user = user.toJSON()
      let passwordIsValid = bcrypt.compareSync(
        noidentitas,
        user.password
      );
      if (passwordIsValid) {
        let token = jwt.sign({
          id: user.id,
          expired: new Date() + (86400 * 1000),
        }, config.secret, {
          expiresIn: 86400 * 1000
        });
        const tempres = {
          id: user.id,
          username: user.norm,
          accessToken: token,
          namapasien: pasien.namapasien || null
        }
        logger.info(clientSecret)
        const encrypted = encrypt({
          data: tempres,
          msg: "sukses",
          success: true,
        }, clientSecret)
        res.status(200).send(encrypted);
        return
      }
      const tempres = {
        id: null,
        username: null,
        accessToken: null,
        namapasien: null
      }
      res.status(404).send({
        data: tempres,
        msg: "failed",
        success: true,
      });
    })
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      msg: error.message,
      code: 500,
      data: error,
      success: false
    });
  }
}

export default {
  signin,
  signup,
  signinPasien
}