import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../models";
const User = db.user;

const verifyToken = (req, res, next) => {
  // let token = req.headers["x-access-token"];
  let bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  let bearer = bearerHeader.split(' ');
  let bearerToken = bearer[1]
  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.idPegawai = decoded.idpegawai;
    next();
  });
};

const verifyTokenUser = (req, res, next) => {
  let bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  let bearer = bearerHeader.split(' ');
  let bearerToken = bearer[1]
  try{
    const decoded = jwt.verify(bearerToken, config.secret);
    req.id = decoded.id;
    req.expired = decoded.expired;
    next();
  }catch(error){
    res.status(401).send({
      msg: "Unauthorized!"
    });
  }
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  verifyTokenUser: verifyTokenUser
};

export default authJwt;
