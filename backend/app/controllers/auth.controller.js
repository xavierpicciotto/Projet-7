const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//inscription de l'utilisateur
exports.signup = (req, res) => {

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
          //si le compte a été attribué d'un ou plusieur roles
          user.setRoles(roles).then(() => {
            return res.status(200).send({
              message: "User registered successfully!"
            });
          });
        });
      } else {
        // role par default = user
        user.setRoles([1]).then(() => {
          return res.status(200).send({
            message: "User registered successfully!"
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message
      });
    });
};

//pour la connexion
exports.signin = (req, res) => {

  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
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

      const token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400 // 24 heures
      });

      const authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message
      });
    });
};

//pour la supression
exports.deleteUser = (req, res) => {
  console.log(req)
  User.destroy({
      where: {
        id: req.userId //ID vérifié
      }
    })
    .then((num) => {
      console.log("REPONSE DU SERVER = " + num)
      if (num == 1) {
        res.status(200).send({
          message: "USER DELETED"
        })
      } else {
        res.status(404).send({
          message: "USER NOT FOUND"
        });
      }
    })
    .catch((err => {
      res.status(500).send({
        message: "ERROR DELETE" + err
      })
    }))
};

//Modification identifiants
exports.modifyUser = (req, res) => {

  User.findOne({
      where: {
        id: req.userId //ID vérifié
      }
    }).then(user => {
      let userModified = req.body;
      //Remplit les changements vides dans le cas échéant avec les valeurs actuels.
      userModified.username === "" ? userModified.username = user.username : userModified.username;
      userModified.email === "" ? userModified.email = user.email : userModified.email;
      userModified.password === "" ? userModified.password = user.password : userModified.password = bcrypt.hashSync(userModified.password, 8);

      User.update({
          ...userModified,
        }, {
          where: {
            id: req.userId //ID vérifié
          }
        }).then(() => {
          res.status(200).send({
            message: "Update Successful",
            username: userModified.username,
            email: userModified.email,
          })
        })
        .catch(err => res.status(500).send({
          message: "ERROR UPDATE" + err
        }))

    })
    .catch(err => res.status(404).send({
      message: "ERROR USER NOT FIND" + err
    }))
}