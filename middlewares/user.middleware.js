const CustomError = require("../errors/CustomError");
const {userService} = require("../service");

function isUserValidForCreate(req, res, next) {
    try {
        const {email = '', name = '', age = 0, password = ''} = req.body;

        if (!email || !name || !password) {
            return next(new CustomError('Some fields is missing', 400));
        }

        if (!Number.isInteger(age)) {
            return next(new CustomError('Set valid age', 400));
        }

        if (name.length < 3) {
            return next(new CustomError('Set valid name', 400));
        }

        if (!email.includes('@')) {
            return next(new CustomError('Set valid email', 400));
        }

        if (password.length < 5) {
            return next(new CustomError('Password should include at list 5 symbols', 403));
        }

        next();
    } catch (e) {
        next(e);
    }
}

function isUserValidForUpdate(req, res, next) {
    try {
        const {name, age} = req.body;

        if (age && !Number.isInteger(age)) {
            return next(new CustomError('Set valid age', 400));
        }

        if (name && name.length < 3) {
            return next(new CustomError('Set valid name', 400));
        }

        req.dataForUpdate = {name, age};
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


module.exports = {
    isUserPresent,
    isUserValidForCreate,
    isUserValidForUpdate,
    isUserUniq
}