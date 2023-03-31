const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { isEmailValid, isValidPasswordCheck } = require('../utils/util');

const { insertUser, findUserByEmail } = require('../services/user.service');

signUp = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        res.status(400).send({ message: 'error', error: "password cannot be empty" });
    }

    if (req.body.password != req.body.confirm_password) {
        res.status(400).send({ message: 'error', error: "passwords do not match" });
    }

    try {
        isValidPasswordCheck(req.body.password);
    } 
    catch (error) {
        return res.status(400).send({
          message: 'error',
          error: 'password_not_valid'
        });
    }

    if (!isEmailValid(req.body.email)){
        res.status(400).send({ message: 'error', error: "invalid email" });
    }

    try{
        const user = insertUser(req.body)
        res.status(200).send({ message: "success" , id: user.id});

    }catch(err){
        res.status(500).send({ message: "error", error: err.message });
    }
};

signIn = async (req, res) => {
    if (!isEmailValid(req.body.email)){
        res.status(400).send({ message: 'error', error: "invalid email" });
    }

    try{
        const user = await findUserByEmail(req.body)
        if (!user) {
            return res.status(404).send({ message: "error", error: "user not found." });
        }
        
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "error",
                error: "invalid email or password"
            });
        }

        var access_token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.access_time // 15 min
        });
    
        var refresh_token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.refresh_time // 1 hour
        });

        res.status(200).send({ message: "success" , data: {access_token, refresh_token}});
    }catch(err){
        res.status(500).send({ message:"error", error: err.message });
    }
};

refreshToken = (req, res) => {
    
    var access_token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.access_time // 15 min
    });

    var refresh_token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.refresh_time // 1 hour
    });
  
    return res.status(200).send({
        message: 'success',
        data: {
          access_token,
          refresh_token
        }
    });
};

module.exports = {
    signUp,
    signIn,
    // refreshToken
};
