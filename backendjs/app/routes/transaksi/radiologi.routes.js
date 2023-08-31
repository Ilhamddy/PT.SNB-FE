import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/penunjang/radiologi/radiologi.controller.js";

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
        "/api/transaksi/radiologi/save-order-pelayanan",
        [authJwt.verifyToken],
        controller.saveOrderPelayanan
    );

    app.get(
        "/api/transaksi/radiologi/getlist-histori-order",
        [authJwt.verifyToken],
        controller.getListHistoryOrder
    );

    app.get(
        "/api/transaksi/radiologi/widget-daftar-order-radiologi",
        [authJwt.verifyToken],
        controller.getWidgetListDaftarOrderRadiologi
    );

    app.get(
        "/api/transaksi/radiologi/list-order-by-norecorder",
        [authJwt.verifyToken],
        controller.getListOrderByNorecOrder
    );

    app.get(
        "/api/transaksi/radiologi/list-daftar-order-radiologi",
        [authJwt.verifyToken],
        controller.getDaftarListHistoryOrder
    );

    app.get(
        "/api/transaksi/radiologi/list-kamar-radiologi",
        [authJwt.verifyToken],
        controller.getKamarRadiologi
    );

    app.put(
        "/api/transaksi/radiologi/update-tglrencana-radiologi",
        [authJwt.verifyToken],
        controller.updateTglRencanaRadiologi
    );

    app.put(
        "/api/transaksi/radiologi/save-verifikasi-radiologi",
        [authJwt.verifyToken],
        controller.saveUserVerifikasi
    );

    app.put(
        "/api/transaksi/radiologi/delete-order-pelayanan",
        [authJwt.verifyToken],
        controller.deleteOrderPelayanan
    );

    app.put(
        "/api/transaksi/radiologi/delete-detail-order-pelayanan",
        [authJwt.verifyToken],
        controller.deleteDetailOrderPelayanan
    );

    app.get(
        "/api/transaksi/radiologi/list-daftar-pasien-radiologi",
        [authJwt.verifyToken],
        controller.getDaftarPasienRadiologi
    );

    app.get(
        "/api/transaksi/radiologi/list-transaksi-pelayanan-radiologi",
        [authJwt.verifyToken],
        controller.getTransaksiPelayananRadiologiByNorecDp
    );

    app.get(
        "/api/transaksi/radiologi/list-combo-radiologi",
        [authJwt.verifyToken],
        controller.getComboRadiologi
    );

    app.post(
        "/api/transaksi/radiologi/save-hasil-expertise",
        [authJwt.verifyToken],
        controller.saveHasilExpertise
    );
    
}