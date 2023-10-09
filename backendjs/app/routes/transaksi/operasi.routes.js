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

    app.get(
        "/api/transaksi/operasi/get-histori-order-operasi",
        [authJwt.verifyToken],
        controller.getHistoriOrderOperasi
    );

    app.get(
        "/api/transaksi/operasi/get-widget-order-operasi",
        [authJwt.verifyToken],
        controller.getWidgetOrderOperasi
    );

    app.get(
        "/api/transaksi/operasi/get-daftar-order-operasi",
        [authJwt.verifyToken],
        controller.getDaftarOrderOperasi
    );
    app.get(
        "/api/transaksi/operasi/get-combo-order-operasi",
        [authJwt.verifyToken],
        controller.getComboOperasi
    );
    app.post(
        "/api/transaksi/operasi/update-order-operasi",
        [authJwt.verifyToken],
        controller.updateOrderOperasi
    )
}