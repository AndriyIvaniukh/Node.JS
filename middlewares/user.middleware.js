const CustomError = require("../errors/CustomError");
const {userService} = require("../service");
const {userValidator, userQueryValidator} = require("../validators");

function isUserValidForCreate(req, res, next) {
    try {
        const {error,value} =  userValidator.newUserValidator.validate(req.body);

        if(error){
            return next(new CustomError(error.details[0].message, 400))
        }

        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
}

function isUserValidForUpdate(req, res, next) {
    try {
        const {error,value} = userValidator.updateUserValidator.validate(req.body);

        if (error){
            return next(new CustomError(error.details[0].message, 400));
        }

        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
}

async function isUserPresent(req, res, next) {
    try {
        const {id} = req.params;

        const user = await userService.findOneUser({_id: id});

        if (!user) {
            return next(new CustomError('User not found', 400));
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

async function isUserUniq(req, res, next) {
    try {
        const {email} = req.body;

        const user = await userService.findOneUser({email});

        if (user) {
            return next(new CustomError(`User with email ${email} is exist`, 409));
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

async function isUserQueryValid (req,res,next) {
    try{
        const {error,value} = userQueryValidator.findAll.validate(req.query);

        if(error){
            return next(new CustomError(error.details[0].message,400));
        }

        req.query = value;
        next();
    }catch (e) {
        next(e)
    }
}

module.exports = {
    isUserPresent,
    isUserValidForCreate,
    isUserValidForUpdate,
    isUserQueryValid,
    isUserUniq
}