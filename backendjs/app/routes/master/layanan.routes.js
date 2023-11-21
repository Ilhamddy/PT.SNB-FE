import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/master/layanan/layanan.controller.js";

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
        "/api/master/layanan/get-combo-tambah-layanan",
        [authJwt.verifyToken],
        controller.getComboTambahLayanan
    );

    app.post(
        "/api/master/layanan/upsert-layanan",
        [authJwt.verifyToken],
        controller.upsertLayanan
    )

    app.get(
        "/api/master/layanan/get-layanan",
        [authJwt.verifyToken],
        controller.getLayanan
    )

}