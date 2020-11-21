const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();
app.use(cors())

// parse la requete en JSON
app.use(bodyParser.json());

// parse les requete des contenus / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");


//synchroniser la base de donées avec sequelize
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