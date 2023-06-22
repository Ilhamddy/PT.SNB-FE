const { authJwt } = require("../../middleware");
const controller = require("../../controllers/transaksi/bridging/bpjs.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/transaksi/bridging/bpjs/generate-signature",
        [authJwt.verifyToken],
        controller.generateSignature
    );

    app.get(
        "/api/transaksi/bridging/bpjs/monitoring/HistoriPelayanan/" + 
        "NoKartu/:nokartu",
        [authJwt.verifyToken],
        controller.getHistoryBPJS
    );
    
}