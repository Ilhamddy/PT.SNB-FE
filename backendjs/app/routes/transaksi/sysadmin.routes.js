

import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/sysadmin/sysadmin.controller.js";

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
        "/api/transaksi/sysadmin/get-tempat-tidur",
        [authJwt.verifyToken],
        controller.getTempatTidur
    )

    app.get(
        "/api/transaksi/sysadmin/get-unit-tempat-tidur",
        [authJwt.verifyToken],
        controller.getUnitTempatTidur
    )

    app.get(
        "/api/transaksi/sysadmin/get-combo-tempat-tidur",
        [authJwt.verifyToken],
        controller.getComboTempatTidur
    )

    app.post(
        "/api/transaksi/sysadmin/upsert-tempat-tidur",
        [authJwt.verifyToken],
        controller.upsertTempatTidur
    )

    app.get(
        "/api/transaksi/sysadmin/get-all-unit",
        [authJwt.verifyToken],
        controller.getAllUnit
    )
    
    app.get(
        "/api/transaksi/sysadmin/get-combo-daftar-unit",
        [authJwt.verifyToken],
        controller.getComboDaftarUnit
    )

    app.post(
        "/api/transaksi/sysadmin/upsert-unit",
        [authJwt.verifyToken],
        controller.upsertUnit
    )

    app.get(
        "/api/transaksi/sysadmin/get-all-kamar",
        [authJwt.verifyToken],
        controller.getAllKamar
    )

    app.get(
        "/api/transaksi/sysadmin/get-combo-daftar-kamar",
        [authJwt.verifyToken],
        controller.getComboDaftarKamar
    )
}