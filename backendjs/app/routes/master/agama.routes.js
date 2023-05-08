const { authJwt } = require("../../middleware");
const controller = require("../../controllers/master/agama/agama.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/master/agama",
      [authJwt.verifyToken],
      controller.allSelect
    );
  
  
  };