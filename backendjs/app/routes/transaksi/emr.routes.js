const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/emr/emr.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/transaksi/emr/save-emr-pasien-ttv",
        [authJwt.verifyToken],
        controller.saveEmrPasienTtv
    );
    app.get(
        "/api/transaksi/emr/getList-ttv",
        [authJwt.verifyToken],
        controller.getListTtv
    );

    
    app.get(
        "/api/transaksi/emr/emr-header",
        [authJwt.verifyToken],
        controller.getHeaderEmr
    );
    app.post(
        "/api/transaksi/emr/edit-emr-pasien-ttv",
        [authJwt.verifyToken],
        controller.editEmrPasienTtv
    );

    app.post(
        "/api/transaksi/emr/save-emr-pasien-cppt",
        [authJwt.verifyToken],
        controller.saveEmrPasienCppt
    );

    app.get(
        "/api/transaksi/emr/getList-cppt",
        [authJwt.verifyToken],
        controller.getListCppt
    );

    app.post(
        "/api/transaksi/emr/edit-emr-pasien-cppt",
        [authJwt.verifyToken],
        controller.editEmrPasienCppt
    );
}