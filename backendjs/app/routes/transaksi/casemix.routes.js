import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/casemix/casemix.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/casemix/list-pasien",
        [authJwt.verifyToken],
        controller.getListPasien
    );

    app.get(
        "/api/transaksi/casemix/list-daftar-pasien",
        [authJwt.verifyToken],
        controller.getListDaftarPasien
    );

    app.get(
        "/api/transaksi/casemix/list-tarif18-pasien",
        [authJwt.verifyToken],
        controller.getListTarif18
    );

    app.get(
        "/api/transaksi/casemix/getList-diagnosax-pasien",
        [authJwt.verifyToken],
        controller.getListDiagnosaPasien
    );

    app.get(
        "/api/transaksi/casemix/getList-diagnosaix-pasien",
        [authJwt.verifyToken],
        controller.getListDiagnosaIxPasien
    );

    app.post(
        "/api/transaksi/casemix/save-bridging-inacbg",
        [authJwt.verifyToken],
        controller.saveBridgingInacbg
    );

    app.post(
        "/api/transaksi/casemix/save-tarif-klaim",
        [authJwt.verifyToken],
        controller.saveTarifKlaim
    );
    
}