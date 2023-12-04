import { authJwt } from "../../middleware";
import controller from "../../controllers/transaksi/satuSehat/satuSehat.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/api/transaksi/satu-sehat/get-list-instalasi",
        [authJwt.verifyToken],
        controller.getListInstalasi
    );
    app.post(
        "/api/transaksi/satu-sehat/update-organization",
        [authJwt.verifyToken],
        controller.updateOrganizationInstalasi
    )
}