//change above line to import
import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/gigi/gigi.controller.js";

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
        "/api/transaksi/gigi/get-all-gigi",
        [authJwt.verifyToken],
        controller.getAllGigi
    );

    app.get(
        "/api/transaksi/gigi/get-all-legend-gigi",
        [authJwt.verifyToken],
        controller.getAllLegendGigi
    )
}