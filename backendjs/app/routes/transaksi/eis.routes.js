import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/eis/eis.controller.js";


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
        "/api/transaksi/eis/get-pasien-rj",
        [authJwt.verifyToken],
        controller.getPasienRJ
    )

    app.get(
        "/api/transaksi/eis/get-pasien-igd",
        [authJwt.verifyToken],
        controller.getPasienIGD
    )

    app.get(
        "/api/transaksi/eis/get-pasien-ranap",
        [authJwt.verifyToken],
        controller.getPasienRanap
    )

    app.get(
        "/api/transaksi/eis/get-count-cara-bayar",
        [authJwt.verifyToken],
        controller.getCountCaraBayar
    )

    app.get(
        "/api/transaksi/eis/get-poliklinik-terbanyak",
        [authJwt.verifyToken],
        controller.getPoliklinikTerbanyak
    )

    app.get(
        "/api/transaksi/eis/get-count-unit",
        [authJwt.verifyToken],
        controller.getCountUnit
    )

    app.get(
        "/api/transaksi/eis/get-status-pegawai",
        [authJwt.verifyToken],
        controller.getStatusPegawai
    )

    app.get(
        "/api/transaksi/eis/get-pegawai-pensiun",
        [authJwt.verifyToken],
        controller.getPegawaiPensiun
    )

    app.get(
        "/api/transaksi/eis/get-dasbor-farmasi",
        [authJwt.verifyToken],
        controller.getDasborFarmasi
    )

    app.get(
        "/api/transaksi/eis/get-dasbor-pendapatan",
        [authJwt.verifyToken],
        controller.getDasborPendapatan
    )

}