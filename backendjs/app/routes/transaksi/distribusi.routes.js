import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/distribusi/distribusi.controller";


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
        "/api/transaksi/gudang/distribusi/get-stok-batch",
        [authJwt.verifyToken],
        controller.getStokBatch
    )

    app.get(
        "/api/transaksi/gudang/distribusi/get-kemasan-by-id",
        [authJwt.verifyToken],
        controller.getKemasanById
    )

    app.post(
        "/api/transaksi/gudang/distribusi/create-or-update-order-barang",
        [authJwt.verifyToken],
        controller.createOrUpdateOrderbarang
    )

    app.get(
        "/api/transaksi/gudang/distribusi/get-order-barang",
        [authJwt.verifyToken],
        controller.getOrderBarang
    )

    app.get(
        "/api/transaksi/gudang/distribusi/get-order-stok-batch",
        [authJwt.verifyToken],
        controller.getOrderStokBatch
    )

    app.post(
        "/api/transaksi/gudang/distribusi/create-or-update-kirim-barang",
        [authJwt.verifyToken],
        controller.createOrUpdateKirimBarang
    )

    app.post(
        "/api/transaksi/gudang/distribusi/verify-kirim",
        [authJwt.verifyToken],
        controller.verifyKirim
    )

    app.post(
        "/api/transaksi/gudang/distribusi/tolak-order",
        [authJwt.verifyToken],
        controller.tolakOrder
    )

    app.post(
        "/api/transaksi/gudang/distribusi/tolak-kirim",
        [authJwt.verifyToken],
        controller.tolakKirim
    )
        
}