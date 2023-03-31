const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

insertUser = async (body) => {
    const user = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 8)
        })

  return user.id;
}

findUserById = async (id) => {
    const user = await User.findOne({
        where: { id: id }
    });

    return user
}

findUserByEmail = async (body) => {
    const user = await User.findOne({
        where: {email: body.email}
    });

    return user
}

module.exports = {
    insertUser,
    findUserById,
    findUserByEmail
}