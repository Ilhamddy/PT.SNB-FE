import { authJwt } from "../../middleware";
import controller from "../../controllers/transaksi/satuSehat/satuSehat.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/transaksi/satu-sehat/get-list-instalasi",
        [authJwt.verifyToken],
        controller.getListInstalasi
    );
    app.post(
        "/api/transaksi/satu-sehat/update-organization",
        [authJwt.verifyToken],
        controller.updateOrganizationInstalasi
    )
    app.get(
        "/api/transaksi/satu-sehat/get-list-unit",
        [authJwt.verifyToken],
        controller.getListUnit
    );
    app.post(
        "/api/transaksi/satu-sehat/update-location-unit",
        [authJwt.verifyToken],
        controller.updateLocationUnit
    )
    app.get(
        "/api/transaksi/satu-sehat/get-list-dokter",
        [authJwt.verifyToken],
        controller.getListDokter
    );
    app.post(
        "/api/transaksi/satu-sehat/update-practitioner-pegawai",
        [authJwt.verifyToken],
        controller.updatePractitionerPegawai
    )
    app.post(
        "/api/transaksi/satu-sehat/update-ihs-patient",
        [authJwt.verifyToken],
        controller.updateIhsPatient
    )
    app.post(
        "/api/transaksi/satu-sehat/upsert-encounter",
        [authJwt.verifyToken],
        controller.upsertEncounter
    )
    app.post(
        "/api/transaksi/satu-sehat/upsert-condition",
        [authJwt.verifyToken],
        controller.upsertCondition
    )
}