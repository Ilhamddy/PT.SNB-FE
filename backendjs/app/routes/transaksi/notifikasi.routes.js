import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/notifikasi/notifikasi.controller.js";

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
        "/api/transaksi/notifikasi/get-list-notifikasi",
        [authJwt.verifyToken],
        controller.getListNotifikasi
    )
    app.post(
        "/api/transaksi/notifikasi/update-status-baca",
        [authJwt.verifyToken],
        controller.updateStatusBaca
    )
}