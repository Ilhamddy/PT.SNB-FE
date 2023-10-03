import { authJwt } from "../../middleware/index.js"
import controller from "../../controllers/daftarmandiri/daftarpasienlama/daftarpasienlama.controller.js"
import { encryptMandiri } from "../../middleware/encryptMandiri.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/daftarmandiri/pasien-lama",
    [      
      authJwt.verifyTokenUser,
      encryptMandiri
    ],
    controller.getPasienLama
  );
  app.get(
    "/api/daftarmandiri/daftar-pasien-lama/combo-daftar",
    [      
      authJwt.verifyTokenUser,
      encryptMandiri
    ],
    controller.getComboDaftar
  );
  app.get(
    "/api/daftarmandiri/daftar-pasien-lama/dokter",
    [      
      authJwt.verifyTokenUser,
      encryptMandiri
    ],
    controller.getDokter
  );
};