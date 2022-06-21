const fileService = require("../service/file.service");

async function getAll(req, res) {
    try {
        const users = await fileService.reader();
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }

}

async function getByID(req, res) {
    try {
        const id = +req.params.id;
        const users = await fileService.reader();

        if (id < 0 || isNaN(id)) {
            res.status(400).send("Not valid values");
            return;
        }
        if (id >= users.length) {
            res.status(404).send(`No user with id ${id}`)
            return;
        }

        res.json(users[id]);

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

        if (!name || name.length < 3) {
            res.status(400).send("Name cant be empty and must be longer them 3 symbols");
            return;
        }

        const users = await fileService.reader();
        const lastID = users[users.length - 1].id;

        const newUser = {"id": lastID + 1, "name": name};
        users.push(newUser)

        await fileService.writer(users);

        res.send('Create new user');
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

async function deleteUserByID(req, res) {
    try {
        const id = +req.params.id;

        if (isNaN(id) || id < 0) {
            res.status(400).send('ID must be a number and >= 0');
            return;
        }

        const users = await fileService.reader();

        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            res.status(400).send(`No user with id ${id}`);
            return;
        }

        users.splice(index, 1);

        await fileService.writer(users);

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