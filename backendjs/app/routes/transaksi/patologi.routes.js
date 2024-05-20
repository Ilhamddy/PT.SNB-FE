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

}