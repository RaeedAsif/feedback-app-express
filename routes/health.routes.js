const controller = require("../controllers/health.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  app.get(
    "/health",
    controller.serverHealth
  );
};