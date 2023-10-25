

import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/tempattidur/tempattidur.controller.js";

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
        "/api/transaksi/tempattidur/get-tempat-tidur",
        [authJwt.verifyToken],
        controller.getTempatTidur
    )

    app.get(
        "/api/transaksi/tempattidur/get-unit-tempat-tidur",
        [authJwt.verifyToken],
        controller.getUnitTempatTidur
    )

    app.get(
        "/api/transaksi/tempattidur/get-combo-tempat-tidur",
        [authJwt.verifyToken],
        controller.getComboTempatTidur
    )

    app.post(
        "/api/transaksi/tempattidur/upsert-tempat-tidur",
        [authJwt.verifyToken],
        controller.upsertTempatTidur
    )
}