
//change above line to import
import db from "../../models";
import config from "../../config/auth.config";
import pool from "../../config/dbcon.query";
import queries from '../../queries/setting/mapsesions';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pasienSignup, tempCaptcha, initCaptcha } from "./authhelper";
import { decrypt, encrypt } from "../../utils/encrypt"
import queriesSDM from '../../queries/sumberDayaManusia/sumberDayaManusia.queries'
import svgCaptcha from 'svg-captcha'
import * as uuid from 'uuid'


const User = db.user;
const Role = db.role;
const UserPasien = db.users_pasien;
const m_pasien = db.m_pasien

const Op = db.Sequelize.Op;

const signUpNew = async (req, res) => {
  const logger = res.locals.logger;
  try{
    const { users,mapUserToUnit } = await db.sequelize.transaction(async (transaction) => {
      let mapUserToUnit =''
      const users = await User.create({
          username: req.body.username,
          statusenabled: req.body.statusEnabled,
          password: bcrypt.hashSync(req.body.password, 8),
          objectpegawaifk: req.body.idpegawai,
          objectaccesmodulfk:req.body.roles
          }, { transaction });

      for (let i = 0; i < req.body.accesUnit.length; i++) {
        const element = req.body.accesUnit[i];
        mapUserToUnit = await db.m_mapusertounit.create({
          objectuserfk: users.id,
          objectunitfk: element.value,
          tglinput: new Date(),
          tglupdate: new Date(),
          objectpegawaifk:req.body.idpegawai
          }, { transaction });
      }
      return { users,mapUserToUnit }
    });
    
    const tempres = {
      users:users,
      mapUserToUnit:mapUserToUnit
    };
    res.status(200).send({
      msg: 'User Berhasil Didaftarkan',
      code: 200,
      data: tempres,
      success: true
    });
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


const signup = async (req, res) => {
  // const logger = res.locals.logger;
  // Save User to Database
  User.create({
    username: req.body.username,
    statusenabled: req.body.statusEnabled,
    password: bcrypt.hashSync(req.body.password, 8),
    objectpegawaifk: req.body.idpegawai,
    objectaccesmodulfk:req.body.roles
  })
    .then(user => {

          res.status(200).send({
            msg: 'User Berhasil Didaftarkan',
            code: 200,
            // data: tempres,
            success: true
          });
        // });
      // }
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
  logger.infoImmediate("masuk pertama")
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        statusenabled:true
      }
    })
    if (!user) {
      // return res.status(404).send({ message: "User Not found." });
      return res.status(200).send({
        accessToken: null,
        message: "User Tidak Aktif, Silahkan Menghubungi Administrator.!",
        data: "User Tidak Aktif, Silahkan Menghubungi Administrator.!",
        status: "errors"
      });
    }
    res.locals.showBodyRes()

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
    const result1 = await pool.query(queries.qMenuModulAplikasi, [user.objectaccesmodulfk]);
    const result3 = await pool.query(queries.qChlidMenuModulAplikasi, [user.objectaccesmodulfk]);
    const result4 = await pool.query(queriesSDM.qAccesUnit, [user.id]);
    let menuItems = [];
    menuItems.push({ id:'Menu',label: "Menu", isHeader: true,idMenu:0,stateVariables:false});

    result1.rows.forEach(element => {
      let filteredData = result3.rows.filter(item => item.idmenu === element.id);
      menuItems.push({id:element.reportdisplay,icon:element.icon,label:element.reportdisplay,link:'/#',stateVariables:false,subItems:filteredData})
    });


    let token = jwt.sign({ id: user.id, idpegawai: user.objectpegawaifk, accesunit:result4.rows,modul:user.objectaccesmodulfk}, config.secret, {
      expiresIn: 86400 // 24 hours test
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      // roles: authorities,
      accessToken: token,
      status: "success",
      success: true,
      sesion: menuItems
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({ message: e, status: "errors" });
  }

};

const signinPasien = async (req, res) => {
  const logger = res.locals.logger;
  try {
    res.locals.showBodyRes()
    const { nocm, password, clientSecret } = req.body;
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
          password: password
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
        password,
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
  signinPasien,
  signUpNew,
}