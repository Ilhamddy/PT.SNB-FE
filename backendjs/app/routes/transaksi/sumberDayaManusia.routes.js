import { authJwt } from "../../middleware";
import controller from "../../controllers/transaksi/sumberDayaManusia/sumberDayaManusia.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/transaksi/sumber-daya-manusia/get-daftar-pegawai",
        [authJwt.verifyToken],
        controller.getDaftarPegawai
    );
    app.get(
        "/api/transaksi/sumber-daya-manusia/get-combo",
        [authJwt.verifyToken],
        controller.getComboSDM
    );
    app.post(
        "/api/transaksi/sumber-daya-manusia/save-biodata-pasien",
        [authJwt.verifyToken],
        controller.saveBiodataPegawai
    )
    app.get(
        "/api/transaksi/sumber-daya-manusia/get-pegawai-byid",
        [authJwt.verifyToken],
        controller.getPegawaiById
    );
    app.get(
        "/api/transaksi/sumber-daya-manusia/combo-jadwal",
        [authJwt.verifyToken],
        controller.getComboJadwal
    );
}