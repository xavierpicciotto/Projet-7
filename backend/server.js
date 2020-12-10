const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();

app.use(cors())

//Parse la requete en JSON.
app.use(bodyParser.json());

//Parse les requetes des contenus / x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));

//Base de données.
const db = require("./app/models");


//Synchroniser la base de donées avec sequelize.
db.sequelize.sync();


//Route de vérifiquation de réponse.
app.get("/", (req, res) => {
  res.json({ message: "APP en fonctionement" });
});

// routes
require('./app/routes/auth.routes')(app);//CRUD compte utilisateur.
require('./app/routes/user.routes')(app);//Droits d'accès. 

//Défini le port a écouter
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});