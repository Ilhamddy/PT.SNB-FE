import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/gudang/gudang.controller";


// eslint-disable-next-line max-lines-per-function
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
        controller.createOrUpdateProdukObat
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
        "/api/transaksi/gudang/get-kemasan-from-produk",
        [authJwt.verifyToken],
        controller.getKemasanFromProduk
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-penerimaan",
        [authJwt.verifyToken],
        controller.createOrUpdatePenerimaan
    )

    app.get(
        "/api/transaksi/gudang/get-penerimaan",
        [authJwt.verifyToken],
        controller.getPenerimaan
    )

    app.get(
        "/api/transaksi/gudang/get-list-penerimaan",
        [authJwt.verifyToken],
        controller.getListPenerimaan
    )

    app.get(
        "/api/transaksi/gudang/get-combo-kartu-stok",
        [authJwt.verifyToken],
        controller.getComboKartuStok
    )

    app.get(
        "/api/transaksi/gudang/get-kartu-stok",
        [authJwt.verifyToken],
        controller.getKartuStok
    )

    app.get(
        "/api/transaksi/gudang/get-combo-stok-unit",
        [authJwt.verifyToken],
        controller.getComboStokUnit
    )

    app.get(
        "/api/transaksi/gudang/get-stok-unit",
        [authJwt.verifyToken],
        controller.getStokUnit
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-stok-opname",
        [authJwt.verifyToken],
        controller.createOrUpdateStokOpname
    )

    app.get(
        "/api/transaksi/gudang/get-stok-opname",
        [authJwt.verifyToken],
        controller.getStokOpname
    )

    app.get(
        "/api/transaksi/gudang/get-stok-opname-detail",
        [authJwt.verifyToken],
        controller.getStokOpnameDetail
    )

    app.post(
        "/api/transaksi/gudang/update-stok-opname-details",
        [authJwt.verifyToken],
        controller.updatedStokOpnameDetails
    )

    app.post(
        "/api/transaksi/gudang/create-or-update-pemesanan",
        [authJwt.verifyToken],
        controller.createOrUpdatePemesanan
    )

    app.get(
        "/api/transaksi/gudang/get-pemesanan",
        [authJwt.verifyToken],
        controller.getPemesanan
    )

    app.get(
        "/api/transaksi/gudang/get-list-pemesanan",
        [authJwt.verifyToken],
        controller.getListPemesanan
    )

    app.get(
        "/api/transaksi/gudang/get-unit-user",
        [authJwt.verifyToken],
        controller.getUnitUser
    )
}