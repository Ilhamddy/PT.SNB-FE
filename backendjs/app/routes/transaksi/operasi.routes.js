import { authJwt } from "../../middleware";
import controller from "../../controllers/transaksi/penunjang/operasi/operasi.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/transaksi/operasi/save-order-operasi",
        [authJwt.verifyToken],
        controller.saveOrderOperasi
    )
}