import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/patologi/patologi.controller.js";

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
        "/api/transaksi/patologi/order-pelayanan",
        [authJwt.verifyToken],
        controller.upsertOrderPelayananPatologi
    );

    app.get(
        "/api/transaksi/patologi/histori",
        [authJwt.verifyToken],
        controller.getHistoriPatologi
    );

    app.get(
        "/api/transaksi/patologi/order",
        [authJwt.verifyToken],
        controller.getListOrderPatologi
    );

    app.get(
        "/api/transaksi/patologi/isi-order",
        [authJwt.verifyToken],
        controller.getIsiOrderByNorec
    )

    app.get(
        "/api/transaksi/patologi/widget-order",
        [authJwt.verifyToken],
        controller.getWidgetOrderPatologi
    )

    app.post(
        "/api/transaksi/patologi/tanggal-rencana",
        [authJwt.verifyToken],
        controller.updateTanggalRencanaPatologi
    )

    app.get(
        "/api/transaksi/patologi/daftar-pasien",
        [authJwt.verifyToken],
        controller.getDaftarPasienPatologi
    )

    app.post(
        "/api/transaksi/patologi/verifikasi",
        [authJwt.verifyToken],
        controller.verifikasiPatologi
    )

    app.post(
        "/api/transaksi/patologi/tolak",
        [authJwt.verifyToken],
        controller.tolakOrderPatologi
    )

    app.get(
        "/api/transaksi/patologi/transaksi",
        [authJwt.verifyToken],
        controller.getTransaksiPelayananPatologiByNorecDp
    )

    app.get(
        "/api/transaksi/patologi/combo-modal",
        [authJwt.verifyToken],
        controller.getComboPatologiModal
    )
}