import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/pegawai/absen/absen.controller.js";
import multer from "multer";
import express from 'express'
import { paketMulter } from "../../middleware/encryptMandiri.js";

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
        "/api/pegawai/absen/foto-lokasi",
        [authJwt.verifyToken, ...paketMulter],
        controller.upsertAbsenFotoLokasi
    );
    
}