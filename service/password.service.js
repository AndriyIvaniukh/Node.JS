const bcrypt = require('bcrypt');

const CustomError = require("../errors/CustomError");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password,hashPassword);

        if (!isPasswordsSame) {
            throw new CustomError("Email or password is wrong", 400);
        }
    }
}