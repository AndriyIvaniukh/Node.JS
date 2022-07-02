const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator} = require('./common.validator')

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator
    }),
}