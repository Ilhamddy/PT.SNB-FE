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
        "/api/transaksi/gudang/tambah-or-edit-produk",
        [authJwt.verifyToken],
        controller.createOrUpdateDetailProduk
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
        "/api/transaksi/gudang/get-produk-konversi",
        [authJwt.verifyToken],
        controller.getProdukKonversi
    )

    app.get(
        "/api/transaksi/gudang/get-kemasan-konversi",
        [authJwt.verifyToken],
        controller.getKemasanKonversi
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-kemasan",
        [authJwt.verifyToken],
        controller.createOrUpdateKemasan
    )

    app.get(
        "/api/transaksi/gudang/get-produk",
        [authJwt.verifyToken],
        controller.getProdukMaster
    )

    app.get(
        "/api/transaksi/gudang/get-produk-edit",
        [authJwt.verifyToken],
        controller.getProdukEdit
    )

    app.get(
        "/api/transaksi/gudang/get-satuan-from-produk",
        [authJwt.verifyToken],
        controller.getSatuanFromProduk
    )
}