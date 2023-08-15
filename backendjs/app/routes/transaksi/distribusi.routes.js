import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/distribusi/distribusi.controller";


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
        "/api/transaksi/gudang/distribusi/get-stok-batch",
        [authJwt.verifyToken],
        controller.getStokBatch
    )
}