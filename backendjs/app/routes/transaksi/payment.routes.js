import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/payment/payment.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/payment/pelayanan-from-antrean/:norecAP",
        [authJwt.verifyToken],
        controller.getPelayananFromAntrean
    );

    app.post(
        "/api/transaksi/payment/create-nota-verif",
        [authJwt.verifyToken],
        controller.createNotaVerif
    )



}