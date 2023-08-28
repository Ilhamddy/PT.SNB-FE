import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/emr/emr.controller.js";

// eslint-disable-next-line max-lines-per-function
export default function (app) {
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
    // cppt
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
     // end

    // diagnosa
    app.get(
        "/api/transaksi/emr/getList-diagnosa-sepuluh",
        [authJwt.verifyToken],
        controller.getListDiagnosa10
    );
    app.get(
        "/api/transaksi/emr/getList-diagnosa-sembilan",
        [authJwt.verifyToken],
        controller.getListDiagnosa9
    );
    app.get(
        "/api/transaksi/emr/getList-diagnosa-combo",
        [authJwt.verifyToken],
        controller.getListComboDiagnosa
    );
    app.post(
        "/api/transaksi/emr/save-emr-pasien-diagnosa",
        [authJwt.verifyToken],
        controller.saveEmrPasienDiagnosa
    );
    app.get(
        "/api/transaksi/emr/getList-diagnosax-pasien",
        [authJwt.verifyToken],
        controller.getListDiagnosaPasien
    );
    app.get(
        "/api/transaksi/emr/getList-diagnosaix-pasien",
        [authJwt.verifyToken],
        controller.getListDiagnosaIxPasien
    );
    app.post(
        "/api/transaksi/emr/save-emr-pasien-diagnosaix",
        [authJwt.verifyToken],
        controller.saveEmrPasienDiagnosaix
    );
    app.delete(
        "/api/transaksi/emr/delete-emr-pasien-diagnosax/:norec",
        [authJwt.verifyToken],
        controller.deleteEmrPasienDiagnosax
    );
    app.delete(
        "/api/transaksi/emr/delete-emr-pasien-diagnosaix/:norec",
        [authJwt.verifyToken],
        controller.deleteEmrPasienDiagnosaix
    );
    // end
    app.post(
        "/api/transaksi/emr/save-emr-pasien-konsul",
        [authJwt.verifyToken],
        controller.saveEmrPasienKonsul
    );

    app.post(
        "/api/transaksi/emr/save-emr-pasien-updatetaskid",
        [authJwt.verifyToken],
        controller.updateTaskid
    );

    app.post(
        "/api/transaksi/emr/save-emr-pasien-updatestatuspulangrj",
        [authJwt.verifyToken],
        controller.updateStatusPulangRJ
    );

    app.get(
        "/api/transaksi/emr/get-obat-from-unit",
        [authJwt.verifyToken],
        controller.getObatFromUnit
    )

    app.post(
        "/api/transaksi/emr/create-or-update-emr-resep-order",
        [authJwt.verifyToken],
        controller.createOrUpdateEmrResepDokter
    )

    app.get(
        "/api/transaksi/emr/get-order-resep-from-dp",
        [authJwt.verifyToken],
        controller.getOrderResepFromDP
    )
}