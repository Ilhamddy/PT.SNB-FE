import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/gizi/gizi.controller.js";

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
        "/api/transaksi/gizi/list-master-gizi",
        [authJwt.verifyToken],
        controller.getMasterGizi
    );
    app.get(
        "/api/transaksi/gizi/list-daftar-pasien-rawat-inap",
        [authJwt.verifyToken],
        controller.getDaftarPasienRanap
    );
    app.post(
        "/api/transaksi/gizi/upsert-order-gizi",
        [authJwt.verifyToken],
        controller.upsertOrderGizi
    )
    app.get(
        "/api/transaksi/gizi/list-daftar-order-gizi",
        [authJwt.verifyToken],
        controller.getDaftarOrderGizi
    );
    app.post(
        "/api/transaksi/gizi/delete-order-gizi",
        [authJwt.verifyToken],
        controller.deleteOrderGizi
    )
    app.post(
        "/api/transaksi/gizi/verifikasi-order-gizi",
        [authJwt.verifyToken],
        controller.upsertVerifikasiOrderGizi
    )
}