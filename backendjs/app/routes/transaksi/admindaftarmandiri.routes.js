import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/transaksi/admindaftarmandiri/admindaftarmandiri.controller.js";
import multer from "multer";
import express from 'express'

const upload = multer({dest: '../../media/upload'})

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
        "/api/admindaftarmandiri/upload-berita",
        [authJwt.verifyToken, upload.fields([{ name: 'file' }, { name: 'json' }])],
        controller.uploadBerita
    );

    app.get(
        "/api/admindaftarmandiri/get-berita",
        [authJwt.verifyToken],
        controller.getBerita
    );

    app.get(
        "/api/admindaftarmandiri/get-berita-norec",
        [authJwt.verifyToken],
        controller.getBeritaNorec
    )
    app.get(
        "/api/daftarmandiri/get-antrean-pemeriksaan-manual",
        [],
        controller.getAntreanPemeriksaanManual
      )
}