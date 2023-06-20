const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/rekammedis/rekammedis.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get(
        "/api/transaksi/rekammedis/list-daftar-dokumen-rekammedis",
        [authJwt.verifyToken],
        controller.getListDaftarDokumenRekammedis
    );

    app.get(
        "/api/transaksi/rekammedis/widget-list-daftar-dokumen-rekammedis",
        [authJwt.verifyToken],
        controller.getWidgetListDaftarDokumenRekammedis
    );

    app.post(
        "/api/transaksi/rekammedis/save-dokumen-rekammedis",
        [authJwt.verifyToken],
        controller.saveDokumenRekammedis
    );
    
}