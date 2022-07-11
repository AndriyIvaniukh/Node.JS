const Joi = require('joi');

const commonValidator = require('./common.validator');

module.exports = {
    newUserValidator: Joi.object({
        name: commonValidator.nameValidator.required(),
        age: commonValidator.ageValidator.required(),
        email: commonValidator.emailValidator.required(),
        password: commonValidator.passwordValidator.required(),
        phone: commonValidator.phoneValidator.required(),
    }),
    updateUserValidator: Joi.object({
        name: commonValidator.nameValidator,
        age: commonValidator.ageValidator
    })
}