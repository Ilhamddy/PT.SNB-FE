
//change above line to import
import db from "../models";
import config from "../config/auth.config";
import pool from "../config/dbcon.query";
import queries from '../queries/setting/mapsesions';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;






const signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    // objectaccesmodulfk: req.body.objectaccesmodulfk
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
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

      
      try {
        pool.query(queries.getSesions, [user.id], (error, result) => {
          if (error) throw error;
          // res.status(200).json(result.rows);
          var resHead=result.rows;
          
          // for (let i = 0; i < result.rows.length; i++) {
            
          //   if(i==0){
          //     let tempresChild = [{ nourut: result.rows[i].nourut,reportdisplay:result.rows[i].reportdisplay,link:result.rows[i].link}]
          //     let tempresHead = { id: result.rows[i].idhead,head:result.rows[i].head,child:tempresChild}
          //     resHead.push(tempresHead)
          //   }else{
          //     for (let x = 0; x < resHead.length; x++) {
                
          //       if(resHead[x].id==result.rows[i].idhead){
          //         let tempresChild = { nourut: result.rows[i].nourut,reportdisplay:result.rows[i].reportdisplay,link:result.rows[i].link}
          //         resHead[x].child.push(tempresChild)
          //         break;
          //       }else{
          //         let tempresChild = [{ nourut: result.rows[i].nourut,reportdisplay:result.rows[i].reportdisplay,link:result.rows[i].link}]
          //         let tempresHead = { id: result.rows[i].idhead,head:result.rows[i].head,child:tempresChild}
          //         resHead.push(tempresHead)
          //         break;
          //       }
          //       // console.log(resHead[x].child)
          //     }
          //   }
          // }

          var token = jwt.sign({ id: user.id, sesion: resHead,idpegawai: user.objectpegawaifk, }, config.secret, {
            expiresIn: 86400 // 24 hours test
          });

          var authorities = [];
          user.getRoles().then(roles => {
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
          });
        });
      } catch (e) {
        res.status(500).send({ message: e, status: "errors" });
      }

    })
    .catch(err => {
      res.status(500).send({ message: err.message, status: "errors" });
    });
};

export default {
  signin,
  signup
}