const { authJwt } = require("../../middleware");
const controller = require("../../controllers/master/combobox.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/master/combobox",
      [authJwt.verifyToken],
      controller.selectComboBox
    );

    app.get(
      "/api/master/desa-kelurahan",
      [authJwt.verifyToken],
      controller.desaKelurahan
    );

    app.get(
      "/api/master/kecamatan",
      [authJwt.verifyToken],
      controller.getKecamatan
    );

    app.get(
      "/api/master/combobox-registrasi",
      [authJwt.verifyToken],
      controller.comboRegistrasi
    );
  
  
  };