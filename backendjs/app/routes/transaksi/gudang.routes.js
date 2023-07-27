import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/gudang/gudang.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/transaksi/gudang/tambah-produk",
        [authJwt.verifyToken],
        controller.createProdukObat
    );

    app.get(
        "/api/transaksi/gudang/get-lain-lain",
        [authJwt.verifyToken],
        controller.getLainLain
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-detail-produk",
        [authJwt.verifyToken],
        controller.createOrUpdateDetailProduk
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-sediaan",
        [authJwt.verifyToken],
        controller.createOrUpdateSediaan
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-satuan",
        [authJwt.verifyToken],
        controller.createOrUpdateSatuan
    )

    app.get(
        "/api/transaksi/gudang/get-konversi",
        [authJwt.verifyToken],
        controller.getKonversi
    )
}