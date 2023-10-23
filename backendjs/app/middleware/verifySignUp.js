import db from "../models";
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(201).send({
        success: false,
        msg: 'Gagal! Username sudah digunakan...!',
        code: 201
      });
      return;
    }

    // Email
    // User.findOne({
    //   where: {
    //     email: req.body.email
    //   }
    // }).then(user => {
    //   if (user) {
    //     res.status(400).send({
    //       message: "Failed! Email is already in use!"
    //     });
    //     return;
    //   }

      next();
    // });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        // res.status(400).send({
        //   message: "Failed! Role does not exist = " + req.body.roles[i]
        // });
        res.status(201).send({
          success: false,
          msg: 'Gagal! Role tidak ada = '+ req.body.roles[i],
          code: 201
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

export default verifySignUp;