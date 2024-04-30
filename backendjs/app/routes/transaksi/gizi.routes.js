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
}