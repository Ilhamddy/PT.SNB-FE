import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/master/tariftindakan/tariftindakan.controller.js";

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
        "/api/master/tariftindakan/get-total-harga-produk",
        [authJwt.verifyToken],
        controller.getTotalHargaProduk
    );

    
    app.get(
        "/api/master/tariftindakan/get-combo-tarif-tindakan",
        [authJwt.verifyToken],
        controller.getComboTarifTindakan
    );

    app.post(
        "/api/master/tariftindakan/upsert-tarif-tindakan",
        [authJwt.verifyToken],
        controller.upsertTarifTindakan
    )

    app.get(
        "/api/master/tariftindakan/get-total-tarif",
        [authJwt.verifyToken],
        controller.getTotalTarif
    )
}