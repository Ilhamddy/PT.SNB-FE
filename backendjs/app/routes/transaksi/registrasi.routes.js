import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/registrasi/registrasi.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
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
        controller.savePasien
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
    
    app.get(
        "/api/transaksi/registrasi/daftar-pasien-lama-or",
        [authJwt.verifyToken],
        controller.getAllByOr
    );
    
    app.post(
        "/api/transaksi/registrasi/save-daftar-pasien",
        [authJwt.verifyToken],
        controller.saveRegistrasiPasien
    );

    app.get(
        "/api/transaksi/registrasi/daftar-pasien-ruangan/:norec",
        [authJwt.verifyToken],
        controller.getRegistrasiPasienNorec
    )

    app.post(
        "/api/transaksi/registrasi/save-penjamin-fk",
        [authJwt.verifyToken],
        controller.saveRegistrasiPenjaminFK
    );

    app.get(
        "/api/transaksi/registrasi/pasien-noregistrasi/:noregistrasi",
        [authJwt.verifyToken],
        controller.getPasienNoregistrasi
    );

    app.get(
        "/api/transaksi/registrasi/daftar-pasien-rawat-jalan",
        [authJwt.verifyToken],
        controller.getDaftarPasienRawatJalan
    );

    app.get(
        "/api/transaksi/registrasi/daftar-pasien-registrasi",
        [authJwt.verifyToken],
        controller.getDaftarPasienRegistrasi
    );

    app.get(
        "/api/transaksi/registrasi/widget-daftar-pasien-registrasi",
        [authJwt.verifyToken],
        controller.getWidgetDaftarPasienRJ
    );

    app.get(
        "/api/transaksi/registrasi/widget-daftar-pasien-registrasi-inap",
        [authJwt.verifyToken],
        controller.getWidgetDaftarPasienRI
    );

    app.get(
        "/api/transaksi/registrasi/daftar-pasien-rawat-inap",
        [authJwt.verifyToken],
        controller.getDaftarPasienRawatInap
    );

    app.get(
        "/api/transaksi/registrasi/save-registrasi-penjamin-fk",
        [authJwt.verifyToken],
        controller.saveRegistrasiPenjaminFK
    )
    
    app.get(
        "/api/transaksi/registrasi/list-daftar-pasien-ruangan",
        [authJwt.verifyToken],
        controller.getDaftarPasienFilter
    )

};