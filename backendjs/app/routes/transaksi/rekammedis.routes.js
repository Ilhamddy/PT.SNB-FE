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

    app.get(
        "/api/transaksi/rekammedis/get-list-pasien-batal",
        [authJwt.verifyToken],
        controller.getListLaporanPasienBatal
    );

    app.get(
        "/api/transaksi/rekammedis/get-list-pasien-kunjungan",
        [authJwt.verifyToken],
        controller.getListLaporanPasienKunjungan
    );

    app.get(
        "/api/transaksi/rekammedis/get-laporan-rl-3-1",
        [authJwt.verifyToken],
        controller.getLaporanRL3_1
    );

    app.get(
        "/api/transaksi/rekammedis/get-sensus-manual",
        [authJwt.verifyToken],
        controller.getSensusManual
    );

    app.get(
        "/api/transaksi/rekammedis/get-laporan-rl-3-2",
        [authJwt.verifyToken],
        controller.getLaporanRL3_2
    );

    app.get(
        "/api/transaksi/rekammedis/get-detail-jenis-produk",
        [authJwt.verifyToken],
        controller.getDetailJenisProduk
    )

    app.get(
        "/api/transaksi/rekammedis/get-layanan-jenis",
        [authJwt.verifyToken],
        controller.getLayananJenis
    )

    app.post(
        "/api/transaksi/rekammedis/create-or-update-map-rl",
        [authJwt.verifyToken],
        controller.createOrUpdateMapRL
    )

    app.get(
        "/api/transaksi/rekammedis/get-master-rl-from-induk",
        [authJwt.verifyToken],
        controller.getMasterRLFromInduk
    )

    app.get(
        "/api/transaksi/rekammedis/get-layanan-from-master-rl",
        [authJwt.verifyToken],
        controller.getLayananFromMasterRL
    )

    app.delete(
        "/api/transaksi/rekammedis/delete-map-rl/:idmaprl",
        [authJwt.verifyToken],
        controller.deleteMapRL
    )

    app.post(
        "/api/transaksi/rekammedis/update-printed",
        [authJwt.verifyToken],
        controller.updatePrinted
    )
}