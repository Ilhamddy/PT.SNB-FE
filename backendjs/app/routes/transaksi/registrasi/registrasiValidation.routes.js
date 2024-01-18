import { authJwt } from "../../../middleware/index.js";
import controller from "../../../controllers/transaksi/registrasi/registrasiValidation.controller.js";

// eslint-disable-next-line max-lines-per-function
export default function (app) {
    const baseUrl = "/api/transaksi/registrasi/validation"
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        baseUrl + "/get-nik",
        [authJwt.verifyToken],
        controller.getNIKAvailable
    );

    app.get(
        baseUrl + "/get-no-rm-last",
        [authJwt.verifyToken],
        controller.getNoRMLast
    )

    app.get(
        baseUrl + "/get-no-bpjs",
        [authJwt.verifyToken],
        controller.getNoBPJS
    )
};