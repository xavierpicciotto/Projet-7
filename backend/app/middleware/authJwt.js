const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  //Action si pas de token.
  if (!token) {
    return res.status(403).send({
      message: "No user connected or authenticated!"
    });
  }

  //Décode le Token.
  jwt.verify(token, config.secret, (err, decoded) => {

    //Si une erreur.
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    //Si utilisation d'un vrai Token sur un autre compte.
    if (req.params.id){
     if (req.params.id != decoded.id) {
       return res.status(401).send({
         message: "Incorrect authorization!"
       })
     }  
    }
    //Défini un ID vérifié.
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {

  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;