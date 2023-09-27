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
    controller.createPasien
  )
};