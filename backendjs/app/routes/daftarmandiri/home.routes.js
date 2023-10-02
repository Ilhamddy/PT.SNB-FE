import { authJwt } from "../../middleware/index.js"
import controller from "../../controllers/daftarmandiri/home/home.controller.js"
import {  encryptMandiri } from "../../middleware/encryptMandiri.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/daftarmandiri/pasien-baru",
    [],
    
  )
  app.post(
    "/api/daftarmandiri/home-user",
    [
      authJwt.verifyTokenUser,
      encryptMandiri
    ],
    controller.getHomePageUser
  );

  app.get(
    "/api/daftarmandiri/jadwal-dokter",
    [],
    controller.getJadwalDokter
  )

  app.get(
    "/api/daftarmandiri/combo-jadwal",
    [],
    controller.getComboJadwal
  )
};