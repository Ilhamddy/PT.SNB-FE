import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/payment/payment.controller.js";

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
        "/api/transaksi/payment/pelayanan-from-antrean/:norecdp",
        [authJwt.verifyToken],
        controller.getPelayananFromDP
    );

    app.post(
        "/api/transaksi/payment/create-nota-verif",
        [authJwt.verifyToken],
        controller.createNotaVerif
    )

    app.get(
        "/api/transaksi/payment/get-daftar-tagihan-pasien",
        [authJwt.verifyToken],
        controller.getDaftarTagihanPasien
    );

    app.get(
        "/api/transaksi/payment/pelayanan-from-verif/:norecnota",
        [authJwt.verifyToken],
        controller.getPelayananFromVerif
    );

    app.post(
        "/api/transaksi/payment/create-bukti-bayar",
        [authJwt.verifyToken],
        controller.createBuktiBayar
    );

    app.post(
        "/api/transaksi/payment/cancel-verif-nota/:norecnota/:norecdp",
        [authJwt.verifyToken],
        controller.cancelNotaVerif
    );

    app.post(
        "/api/transaksi/payment/cancel-bayar/:norecnota/:norecbayar",
        [authJwt.verifyToken],
        controller.cancelBayar
    );

    app.get(
        "/api/transaksi/payment/get-daftar-piutang-pasien/:location",
        [authJwt.verifyToken],
        controller.getAllPiutang
    );

    app.get(
        "/api/transaksi/payment/get-payment-piutang-pasien/:norecpiutang",
        [authJwt.verifyToken],
        controller.getPaymentForPiutang
    );

    app.get(
        "/api/transaksi/payment/get-laporan-pendapatan-kasir",
        [authJwt.verifyToken],
        controller.getLaporanPendapatanKasir
    );

    app.get(
        "/api/transaksi/payment/piutang-after-date",
        [authJwt.verifyToken],
        controller.getPiutangAfterDate
    );
    app.get(
        "/api/transaksi/payment/daftar-verifikasi-remunerasi",
        [authJwt.verifyToken],
        controller.getDaftarVerifikasiRemunerasi
    );
    app.post(
        "/api/transaksi/payment/save-verifikasi-remunerasi",
        [authJwt.verifyToken],
        controller.saveVerifikasiRemunerasi
    );
    app.get(
        "/api/transaksi/payment/daftar-sudah-verifikasi-remunerasi",
        [authJwt.verifyToken],
        controller.getDaftarSudahVerifikasiRemun
    );
}