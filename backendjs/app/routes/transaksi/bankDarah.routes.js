import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/bankDarah/bankDarah.controller.js";

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
        "/api/transaksi/bankdarah/list-detail-jenis-produkbankdarah",
        [authJwt.verifyToken],
        controller.getDetailJenisProdukBankDarah
    );
    app.post(
        "/api/transaksi/bankdarah/upsert-order-pelayanan-bank-darah",
        [authJwt.verifyToken],
        controller.upsertOrderPelayananBankDarah
    )
    app.get(
        "/api/transaksi/bankdarah/riwayat-order-bank-darah",
        [authJwt.verifyToken],
        controller.getRiwayatOrderBankDarah
    );
}