const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  app.post(
    "/register",
    [
      verifySignUp.checkDuplicate
    ],
    controller.signUp
  );

  app.post(
    "/login",
    controller.signIn
  );
};