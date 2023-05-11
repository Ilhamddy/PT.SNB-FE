const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/registrasi/registrasi.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/registrasi/daftar-pasien-lama",
        [authJwt.verifyToken],
        controller.allSelect
    );

    app.post(
        "/api/transaksi/registrasi/pasien-baru",
        [authJwt.verifyToken],
        controller.addPost
    );

    app.put(
        "/api/transaksi/registrasi/update-pasien",
        [authJwt.verifyToken],
        controller.updatePasienById
    );

    app.get(
        "/api/transaksi/registrasi/pasien/:id",
        [authJwt.verifyToken],
        controller.getPasienById
    );


};