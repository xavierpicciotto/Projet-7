const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //route pour récupérer tout les contenus
  app.get("/api/test/all", controller.allAccess);
  
  //route pour récupérer user content
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  //route pour récupérer modérator content
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  //route pour récupérer admin content
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};