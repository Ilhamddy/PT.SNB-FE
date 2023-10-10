import { authJwt } from "../../middleware/index.js"
import controller from "../../controllers/daftarmandiri/userpasien/userpasien.controller.js"
import { encryptMandiri } from "../../middleware/encryptMandiri.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/daftarmandiri/user-pasien/create-pasien",
    [],
    controller.upsertPasien
  )
  app.post(
    "/api/daftarmandiri/user-pasien/update-pasien",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.upsertPasien
  )
  app.get(
    "/api/daftarmandiri/user-pasien/riwayat-reservasi",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.getRiwayatReservasi
  )
  app.post(
    "/api/daftarmandiri/user-pasien/batal-regis",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.batalRegis
  )
  app.get(
    "/api/daftarmandiri/user-pasien/get-pasien-edit",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.getPasienEdit
  )
  app.get(
    "/api/daftarmandiri/user-pasien/get-pasien-akun",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.getPasienAkun
  )
  app.get(
    "/api/daftarmandiri/user-pasien/get-combo-penjamin",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.getComboPenjamin
  )
  app.post(
    "/api/daftarmandiri/user-pasien/upsert-penjamin",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.upsertPenjamin
  )
  app.get(
    "/api/daftarmandiri/user-pasien/get-penjamin-pasien",
    [authJwt.verifyTokenUser, encryptMandiri],
    controller.getPenjaminPasien
  )
};