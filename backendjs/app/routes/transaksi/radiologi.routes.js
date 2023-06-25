const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/penunjang/radiologi/radiologi.controller");

module.exports = function (app) {
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
        "/api/transaksi/radiologi/list-daftar-order-radiologi",
        [authJwt.verifyToken],
        controller.getDaftarListHistoryOrder
    );
    
}