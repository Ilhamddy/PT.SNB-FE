import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv"
import './app/scheduler/scheduler';
import * as path from "path"

import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import agamaRoutes from './app/routes/master/agama.routes.js';
import registrasiRoutes from './app/routes/transaksi/registrasi/registrasi.routes.js';
import registrasiValidationRoutes from './app/routes/transaksi/registrasi/registrasiValidation.routes.js';

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
import homeRoutes from "./app/routes/daftarmandiri/home.routes";
import distribusiRoutes from "./app/routes/transaksi/distribusi.routes.js"
import { addResBody, logRequests } from "./app/middleware/logrequests.js";
import farmasiRoutes from "./app/routes/transaksi/farmasi.routes.js";
import kioskRoutes from "./app/routes/transaksi/kiosk.routes";
import viewerRoutes from "./app/routes/transaksi/viewer.routes";
import userPasienRoutes from "./app/routes/daftarmandiri/userpasien.routes";
import daftarpasienlamaRoutes from "./app/routes/daftarmandiri/daftarpasienlama.routes";
import { decryptMandiri } from "./app/middleware/encryptMandiri";
import operasiRoutes from "./app/routes/transaksi/operasi.routes";
import filesRoutes from "./app/routes/transaksi/files.routes";
import adminDaftarMandiriRoutes from "./app/routes/transaksi/admindaftarmandiri.routes"
import sumberDayaManusiaRoutes from "./app/routes/transaksi/sumberDayaManusia.routes";
import sysadminRoutes from "./app/routes/transaksi/sysadmin.routes";
import systemRoutes from "./app/routes/transaksi/system.routes";
import eisRoutes from "./app/routes/transaksi/eis.routes.js";
import layananRoutes from "./app/routes/master/layanan.routes.js";
import tariftindakanRoutes from "./app/routes/master/tariftindakan.routes.js";
import satuSehatRoutes from "./app/routes/transaksi/satuSehat.routes.js";
import bankDarahRoutes from "./app/routes/transaksi/bankDarah.routes.js";
import giziRoutes from "./app/routes/transaksi/gizi.routes.js";
import gigiRoutes from "./app/routes/transaksi/gigi.routes.js";
import daftarPasienRoutes from "./app/routes/transaksi/registrasi/daftarPasien.routes.js";
import patologiRoutes from "./app/routes/transaksi/patologi.routes.js";
import notifikasiRoutes from "./app/routes/transaksi/notifikasi.routes.js";
import http from 'http';
import { Server } from 'socket.io';

dotenv.config()

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.APP_FE_URL, // Allow React app to connect
    methods: ["GET", "POST"],
    credentials: true
  }
});

export const sendMessage = (send,logger) => {
  try{
    io.emit('receiveMessage', send);
  }catch(e){
    logger && logger.error(e)
  }
}

let corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = path.resolve(path.dirname(''));
console.log(__dirname)
app.use('/media', express.static(__dirname + '/app/media'));

app.use(addResBody)
app.use(logRequests)
app.use(decryptMandiri)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SNB application." });
});

// routes
authRoutes(app);
userRoutes(app);
agamaRoutes(app);
registrasiRoutes(app);
registrasiValidationRoutes(app);
masterRoutes(app);
emrRoutes(app);
bpjsRoutes(app);
tindakanRoutes(app);
rekammedisRoutes(app);
radiologiRoutes(app);
laboratoriumRoutes(app);
paymentRoutes(app);
casemixRoutes(app)
gudangRoutes(app);
distribusiRoutes(app);
farmasiRoutes(app);
kioskRoutes(app);
viewerRoutes(app);
userPasienRoutes(app);
homeRoutes(app);
daftarpasienlamaRoutes(app);
operasiRoutes(app);
filesRoutes(app);
adminDaftarMandiriRoutes(app);
sumberDayaManusiaRoutes(app);
sysadminRoutes(app);
systemRoutes(app);
eisRoutes(app);
layananRoutes(app);
tariftindakanRoutes(app);
satuSehatRoutes(app);
bankDarahRoutes(app);
giziRoutes(app);
gigiRoutes(app);
daftarPasienRoutes(app);
patologiRoutes(app);
notifikasiRoutes(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
io.on('connection', (socket) => {
  // socket.on('sendMessage', (message) => {
  //   io.emit('receiveMessage', message);
  // });


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});