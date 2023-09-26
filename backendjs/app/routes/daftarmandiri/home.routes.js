import { authJwt } from "../../middleware/index.js"
import controller from "../../controllers/daftarmandiri/home/home.controller.js"
import { decryptMandiri } from "../../middleware/decryptMandiri.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/daftarmandiri/home-user",
    [
      authJwt.verifyTokenUser,
      decryptMandiri
    ],
    controller.getHomePageUser
  );
};