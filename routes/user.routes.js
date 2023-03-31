const controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  app.get(
    "/user",
    [
        authJwt.verifyToken
    ],
    controller.getSelf
  );
};