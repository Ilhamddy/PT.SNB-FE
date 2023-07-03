const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/penunjang/laboratorium/laboratorium.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/laboratorium/list-detail-jenis-produklab",
        [authJwt.verifyToken],
        controller.getDetailJenisProdukLab
    );
}