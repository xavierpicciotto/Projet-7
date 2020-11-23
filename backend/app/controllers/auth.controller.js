const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//inscription de l'utilisateur
exports.signup = (req, res) => {
  // sauvegarde l'utilisateur sur la base de données
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          //si le compte a été atribué d'un ou plusieur roles
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // role par default = user
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//pour la connexion
exports.signin = (req, res) => {
  //test req
  console.log( JSON.stringify(req.body)  + "TEST requete de la connexion");
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      const authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//pour la supression
exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((num) => {
    console.log("REPONSE DU SERVER = "+ num)
    if(num == 1){
      res.send({
        message: "USER DELETED"
      })
    } else {
      res.send({
        message: "ERROR DELETE"
      });
    }
  })
  .catch((err => {
    res.status(500).send({
      message: "impossible de suprimé User"
    })
  }))
};
//Modification identifiants
exports.modifyUser = (req, res) => {
  const user = req.body
  console.log(JSON.stringify(user)  + "requete modify" +req.params.id)
  User.update({
    ...user,
  },{
       where: {
      id: req.params.id
    } 
  }).then(x => console.log(x+"then"))
  .catch(x => console.log(x+"error"))
}