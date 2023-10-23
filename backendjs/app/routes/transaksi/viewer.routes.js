
import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/viewer/viewer.controller.js";

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
        "/api/transaksi/viewer/get-loket-sisa",
        [authJwt.verifyToken],
        controller.getLoketSisa
    );

    app.post(
        "/api/transaksi/viewer/panggil-loket",
        [authJwt.verifyToken],
        controller.panggilLoket
    )

    app.get(
        "/api/transaksi/viewer/get-all-loket",
        [authJwt.verifyToken],
        controller.getAllLoket
    )

    app.get(
        "/api/transaksi/viewer/get-all-terpanggil",
        [authJwt.verifyToken],
        controller.getAllTerpanggil
    )
    
    app.post(
        "/api/transaksi/viewer/panggil-ulang-antrean",
        [authJwt.verifyToken],
        controller.panggilUlangAntrean
    )

    app.get(
        "/api/transaksi/viewer/get-jadwal-dokter",
        [authJwt.verifyToken],
        controller.getJadwalDokter
    )

    app.get(
        "/api/transaksi/viewer/get-jadwal-operasi",
        [authJwt.verifyToken],
        controller.getJadwalOperasi
    )
}