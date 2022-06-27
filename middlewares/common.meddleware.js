const {Types} = require('mongoose');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;
            const isValid = Types.ObjectId.isValid(id);

            if (!isValid) {
                return next(new CustomError('Not valid ID', 400));
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}