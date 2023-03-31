const controller = require("../controllers/feedback.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  app.post(
    "/feedback",
    [
        authJwt.verifyToken
    ],
    controller.createFeedback
  );

  app.get(
    "/feedbacks",
    [
        authJwt.verifyToken
    ],
    controller.getFeedbacks
  );
};