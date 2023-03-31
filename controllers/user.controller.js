const { findUserById } = require('../services/user.service');

getSelf = async (req, res) => {
    try{
        const user = await findUserById(req.userId)
        if (!user){
            res.status(404).send({ message: "error", error: "user not found" });
        }
        const { password, ...userData } = user.dataValues;
        res.status(200).send({ message: "success" , data: userData});
    }catch(err){
        res.status(500).send({ message: "error", error: err.message });
    }
};

module.exports = {getSelf}