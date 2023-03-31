const { isEmail } = require('validator');
const { ValidationError } = require('sequelize');
const hasUpper = new RegExp('[A-Z]');
const hasLower = new RegExp('[a-z]');
const hasDigit = new RegExp('\\d');
const hasSpecial = new RegExp('[!@#$%^&*()]');
const jwt = require('jsonwebtoken');

isEmailValid = (email) => {
    return isEmail(email);
}

isValidPasswordCheck = (password) => {
    if (password.length < 8) {
      throw new ValidationError('password is less than 8 characters');
    }
  
    if (!hasUpper.test(password)) {
      throw new ValidationError('password should have at least one uppercase letter');
    }
  
    if (!hasLower.test(password)) {
      throw new ValidationError('password should have at least one lowercase letter');
    }
  
    if (!hasDigit.test(password)) {
      throw new ValidationError('password should have at least one digit');
    }
  
    if (!hasSpecial.test(password)) {
      throw new ValidationError('password should have at least one special character');
    }
  
    return true;
}

validateToken = (token, publicKey) => {
    const decodedPublicKey = Buffer.from(publicKey, 'base64');
  
    return new Promise((resolve, reject) => {
      jwt.verify(token, decodedPublicKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(decoded.sub);
      });
    });
  }

module.exports = {
    isEmailValid,
    isValidPasswordCheck,
    validateToken
};
