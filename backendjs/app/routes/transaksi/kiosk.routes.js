import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/kiosk/kiosk.controller.js";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/kiosk/combo-kiosk",
        // [authJwt.verifyToken],
        controller.getComboKiosk
    );

}