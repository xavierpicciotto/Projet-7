const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  //envois les headers dans la reponse
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //route pour l'inscription.
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  
  //route pour la connexion.
  app.post("/api/auth/signin", controller.signin);

  //route pour la supression.
  app.delete("/api/auth/delete/:id",authJwt.verifyToken,controller.deleteUser);

  //route pour la modification.
  app.put("/api/auth/modify/:id",authJwt.verifyToken,[verifySignUp.checkDuplicateUsernameOrEmail], controller.modifyUser)
};