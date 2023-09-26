import { verifySignUp, authJwt } from "../middleware/index.js"
import controller from "../controllers/auth/auth.controller.js"
import { decryptMandiri } from "../middleware/encryptMandiri";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post(
    "/api/auth/login-user-pasien",
    [],
    controller.signinPasien
  );

  app.get(
    "/api/auth/verify-email/get-dummy",
    [
      authJwt.verifyTokenUser,
      decryptMandiri
    ],
    controller.signinPasien
  )

  app.post("/api/auth/signin", controller.signin);
};