import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/files/files.controller.js";
import multer from "multer";

const upload = multer({dest: './app/media/upload'})
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
        "/api/files/upload-image",
        [authJwt.verifyToken, upload.single("file")],
        controller.postImage
    );

    app.get(
        "/api/files/get-log",
        [authJwt.verifyToken],
        controller.getLogFile
    );
    
}