const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models");
const Role = db.role;

const app = express()

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}


module.exports = app