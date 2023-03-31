const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'error', error: 'Missing or invalid Authorization header' });
  }

  let token = authorizationHeader.substring(7);

  if (!token) {
    return res.status(403).send({
      message: "error",
      message: "no_token_provided"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;