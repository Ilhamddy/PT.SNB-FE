import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv"

import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import agamaRoutes from './app/routes/master/agama.routes.js';
import registrasiRoutes from './app/routes/transaksi/registrasi.routes.js';
import masterRoutes from './app/routes/master/master.routes.js';
import emrRoutes from './app/routes/transaksi/emr.routes.js';
import bpjsRoutes from './app/routes/transaksi/bpjs.routes.js';
import tindakanRoutes from './app/routes/transaksi/tindakan.routes.js';
import rekammedisRoutes from './app/routes/transaksi/rekammedis.routes.js';
import radiologiRoutes from './app/routes/transaksi/radiologi.routes.js';
import laboratoriumRoutes from './app/routes/transaksi/laboratorium.routes.js';
import paymentRoutes from "./app/routes/transaksi/payment.routes.js";
import casemixRoutes from "./app/routes/transaksi/casemix.routes.js";
import gudangRoutes from "./app/routes/transaksi/gudang.routes.js"
import { logRequests } from "./app/middleware/logrequests.js";

dotenv.config()

const app = express();


let corsOptions = {
  origin: "http://localhost:8081"
};



app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logRequests)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SNB application." });
});

// routes
authRoutes(app);
userRoutes(app);
agamaRoutes(app);
registrasiRoutes(app);
masterRoutes(app);
emrRoutes(app);
bpjsRoutes(app);
tindakanRoutes(app);
rekammedisRoutes(app);
radiologiRoutes(app);
laboratoriumRoutes(app);
paymentRoutes(app);
casemixRoutes(app)
gudangRoutes(app)


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});