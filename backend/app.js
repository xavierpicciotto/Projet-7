const express = require('express');

const app = express()

app.use((req,res) => {
    res.json({ message: 'je suis là :3'});
    let time = Date();
    console.log('une requète a été faite à '+ time);
});

//pas sur de l'emplacement (peu être vers server.js)
const db = require("./models/sequelize");
db.sequelize.sync();

module.exports = app
