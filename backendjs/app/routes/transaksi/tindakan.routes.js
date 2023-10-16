
import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/tindakan/tindakan.controller.js";

// eslint-disable-next-line max-lines-per-function
export default function (app) {
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

    app.get(
        "/api/transaksi/tindakan/list-tagihan-print",
        [authJwt.verifyToken],
        controller.getAllBillingPrint
    );

    app.post(
        "/api/transaksi/tindakan/save-pelayanan-pasien-temp",
        [authJwt.verifyToken],
        controller.savePelayananPasienTemp
    );
    app.get(
        "/api/transaksi/tindakan/list-pelayanan-pasien-temp",
        [authJwt.verifyToken],
        controller.getListPelayananPasienTemp
    );
    app.post(
        "/api/transaksi/tindakan/delete-pelayanan-pasien-temp",
        [authJwt.verifyToken],
        controller.deletePelayananPasienTemp
    );
    app.get(
        "/api/transaksi/tindakan/widget-efisiensi-klaim",
        [authJwt.verifyToken],
        controller.getWidgetEfisiensiKlaim
    );
    app.post(
        "/api/transaksi/tindakan/update-estimasi-klaim",
        [authJwt.verifyToken],
        controller.updateEstimasiKlaim
    );
}