const db = require("../models");
const User = db.user;

checkDuplicate = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "error",
          error: "email_already_in_use"
        });
        return;
      }
      
      next();
    });
};


const verifySignUp = {
    checkDuplicate: checkDuplicate,
};
  
module.exports = verifySignUp;