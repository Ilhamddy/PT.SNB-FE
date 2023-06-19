const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/tindakan/tindakan.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/tindakan/list-antreanpemeriksaan/:norec",
        [authJwt.verifyToken],
        controller.getListAntreanPemeriksaan
    );

    app.get(
        "/api/transaksi/tindakan/list-produk-tokelas-tounit",
        [authJwt.verifyToken],
        controller.getListProdukToKelasToUnit
    );

    app.get(
        "/api/transaksi/tindakan/list-jenis-pelaksana",
        [authJwt.verifyToken],
        controller.getListJenisPelaksana
    );

    app.get(
        "/api/transaksi/tindakan/list-nama-pelaksana",
        [authJwt.verifyToken],
        controller.getListNamaPelaksana
    );

    app.post(
        "/api/transaksi/tindakan/save-tindakan-pasien",
        [authJwt.verifyToken],
        controller.saveTindakanPasien
    );

    app.get(
        "/api/transaksi/tindakan/list-tagihan",
        [authJwt.verifyToken],
        controller.getListTagihan
    );
    
}