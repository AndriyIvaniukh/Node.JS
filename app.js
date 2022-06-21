const express = require('express');
const {fileService} = require("./service");

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
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
})

app.post('/users', async (req, res) => {
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
})

app.put('/users', async (req, res) => {
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
    }
)

app.delete('/users/:id', async (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id < 0){
        res.status(400).send('ID must be a number and >= 0');
        return;
    }

    const users =  await fileService.reader();

    const index = users.findIndex(user => user.id === id);

    if (index===-1){
        res.status(400).send(`No user with id ${id}`);
        return;
    }

    users.splice(index, 1);

    await fileService.writer(users);




    res.send(`Deleted User with id - ${id}`)
})


app.listen(5000, () => {
    console.log('Started at port 5000');
});


