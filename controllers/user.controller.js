const fileService = require("../service/file.service");
const User = require('../dataBase/User');

async function getAll(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }

}

async function getByID(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.json(user);

    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

async function updateUserByID(req, res) {
    try {
        const {id, name} = req.body;

        if (!id || id < 0) {
            res.status(400).send("wrong value ID");
            return;
        }
        if (!name || name.length < 3) {
            res.status(400).send("Name cant be empty and must be longer them 3 symbols");
            return;
        }

        const users = await fileService.reader();
        let noUser = true;
        for (let user of users) {
            if (user.id === id) {
                user.name = name;
                noUser = false
                break;
            }
        }
        if (noUser) {
            res.status(400).send('No user with this ID')
            return;
        }

        await fileService.writer(users);
        res.send('good')
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

async function createUser(req, res) {
    try {
        const {name} = req.body;
        const user = await User.create(req.body);

        res.json(user);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

async function deleteUserByID(req, res) {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id})

        res.send(`Deleted User with id - ${id}`)
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}


module.exports = {
    getAll,
    getByID,
    updateUserByID,
    createUser,
    deleteUserByID
}