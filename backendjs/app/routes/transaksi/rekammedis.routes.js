import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/rekammedis/rekammedis.controller.js";

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
    
    app.get(
        "/api/transaksi/rekammedis/get-combo-laporan-rekammedis",
        [authJwt.verifyToken],
        controller.getComboLaporanRekammedis
    );

    app.get(
        "/api/transaksi/rekammedis/get-list-pasien-daftar",
        [authJwt.verifyToken],
        controller.getListLaporanDaftarPasien
    );
}