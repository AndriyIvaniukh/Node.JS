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
    if (id > users.length) {
        res.status(404).send(`No user with id ${id}`)
        return;
    }

    res.json(users[id]);
})

app.post('/users', async (req, res) => {
    const {id, name} = req.body;
    const users = await fileService.reader();

    for (let user of users) {
        if(user.id === id){
            user.name = name;
        }
    }
    console.log(users)
    await fileService.writer(users);

    res.send('good')
})

//
// app.put('/users', (req, res) => {
//         console.log(req.body);
//         res.send('sdad')
//     }
// )


app.listen(5000, () => {
    console.log('Started at port 5000');
});