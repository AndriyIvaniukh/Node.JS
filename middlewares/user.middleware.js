function checkUserOnCreate(req, res, next) {
    try {
        const {email = '', name = '', age = 0, password = ''} = req.body;

        if (!email || !name || !password) {
            throw new Error('Some fields is missing')
        }

        if(password.length<5){
            throw new Error('Password should include at list 5 symbols')
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
}


module.exports = {}