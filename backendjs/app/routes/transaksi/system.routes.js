import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/system/system.controller.js";

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
        "/api/system/pull-git",
        [],
        controller.pullGit
    );

    app.post(
        "/api/system/pull-git",
        [],
        controller.pullGit
    );
}