import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/master/agama/agama.controller.js";

export default function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/master/agama",
      [authJwt.verifyToken],
      controller.allSelect
    );
  };