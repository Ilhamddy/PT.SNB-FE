//change above line to import
import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/laboratorium/laboratorium.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/laboratorium/list-detail-jenis-produklab",
        [authJwt.verifyToken],
        controller.getDetailJenisProdukLab
    );

    app.post(
        "/api/transaksi/laboratorium/save-order-pelayanan",
        [authJwt.verifyToken],
        controller.saveOrderPelayanan
    );

    app.get(
        "/api/transaksi/laboratorium/getlist-histori-order",
        [authJwt.verifyToken],
        controller.getListHistoryOrder
    );
}