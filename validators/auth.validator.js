const Joi = require('joi');
const {emailValidator, passwordValidator} = require("./common.validator");

module.exports = {
    login: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),

    resetPassword: Joi.object({
       email: emailValidator.required(),
    }),

    setPassword: Joi.object({
        password: passwordValidator.required()
    }),
}
