import { verifySignUp } from "../middleware/index.js"
import controller from "../controllers/auth/auth.controller.js"

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
  )

  app.post("/api/auth/signin", controller.signin);
};