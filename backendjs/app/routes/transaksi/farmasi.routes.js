import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/farmasi/farmasi.controller.js";

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
        "/api/transaksi/farmasi/get-order-resep-query",
        [authJwt.verifyToken],
        controller.getOrderResepQuery
    );

    app.get(
        "/api/transaksi/farmasi/get-order-resep-from-norec",
        [authJwt.verifyToken],
        controller.getOrderResepFromNorec
    )

    app.post(
        "/api/transaksi/farmasi/create-or-update-verif-resep",
        [authJwt.verifyToken],
        controller.createOrUpdateVerifResep
    )

    app.post(
        "/api/transaksi/farmasi/create-or-update-penjualan-bebas",
        [authJwt.verifyToken],
        controller.createOrUpdatePenjualanBebas
    )

    app.get(
        "/api/transaksi/farmasi/get-pasien-from-nocm",
        [authJwt.verifyToken],
        controller.getPasienFromNoCm
    )

    app.get(
        "/api/transaksi/farmasi/get-verif-resep",
        [authJwt.verifyToken],
        controller.getAllVerifResep
    )

    app.post(
        "/api/transaksi/farmasi/create-or-update-retur",
        [authJwt.verifyToken],
        controller.createOrUpdateRetur
    )

    app.get(
        "/api/transaksi/farmasi/get-antrean-from-dp",
        [authJwt.verifyToken],
        controller.getAntreanFromDP
    )

    app.post(
        "/api/transaksi/farmasi/create-or-update-order-plus-verif",
        [authJwt.verifyToken],
        controller.createOrUpdateOrderPlusVerif
    )
    app.post(
        "/api/transaksi/farmasi/create-antrean-farmasi",
        [authJwt.verifyToken],
        controller.createAntreanFarmasi
    )
}