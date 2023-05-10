const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Acces-Control-Allow-Origin', '*');
//   res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,Options');
//   res.setHeader('Acces-Control-Allow-Headers','Content-Type, Authorization');
//   next();
// })

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SNB application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/master/agama.routes')(app);
require('./app/routes/transaksi/registrasi.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});