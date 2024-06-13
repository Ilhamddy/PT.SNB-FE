import { verifySignUp, authJwt } from "../middleware/index.js"
import controller from "../controllers/auth/auth.controller.js"
import { decryptMandiri } from "../middleware/encryptMandiri";

export default function(app, middleware = []) {
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
      verifySignUp.checkRolesExisted,
      ...middleware
    ],
    controller.signUpNew
  );
  app.post(
    "/api/auth/login-user-pasien",
    [...middleware],
    controller.signinPasien
  );

  app.get(
    "/api/auth/verify-email/get-dummy",
    [
      authJwt.verifyTokenUser,
      decryptMandiri,
      ...middleware
    ],
    controller.signinPasien
  )

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/test-encryption", controller.testEncryption)

};