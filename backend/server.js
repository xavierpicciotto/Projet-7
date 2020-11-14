const express = require("express");
const bodyParser = require("body-parser");


const app = express();

/*const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse la requete en JSON
app.use(bodyParser.json());

// parse les requete des contenus / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");


//synchroniser la data base avec sequelize
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "APP en fonctionement" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});