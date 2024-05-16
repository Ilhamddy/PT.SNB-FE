import { authJwt } from "../../../middleware/index.js";
import controller from "../../../controllers/transaksi/registrasi/daftarPasien.controller.js";

// eslint-disable-next-line max-lines-per-function
export default function (app) {
    const baseUrl = "/api/transaksi/registrasi/daftar-pasien"
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        baseUrl + "/registrasi/combo",
        [authJwt.verifyToken],
        controller.getComboDaftarPasienRegistrasi
    );

    app.get(
        baseUrl + "/registrasi",
        [authJwt.verifyToken],
        controller.getDaftarPasienRegistrasi
    );

    


};