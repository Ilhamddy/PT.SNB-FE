import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/bridging/bpjs.controller.js";

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

    app.get(
        "/api/transaksi/bridging/bpjs/provinsi",
        [authJwt.verifyToken],
        controller.getProvinsi
    );

    app.get(
        "/api/transaksi/bridging/bpjs/kabupaten/:provinsi",
        [authJwt.verifyToken],
        controller.getKabupaten
    );

    app.get(
        "/api/transaksi/bridging/bpjs/kecamatan/:kabupaten",
        [authJwt.verifyToken],
        controller.getKecamatan
    );

    app.get(
        "/api/transaksi/bridging/bpjs/faskes/",
        [authJwt.verifyToken],
        controller.getFaskes
    )
}