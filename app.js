const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const users = require('./dataBase/users');

let file;
fs.readFile(`./dataBase/users.json`, (err, data) => {
    if(err){
        console.log(err);
        return
    }
    file = JSON.parse(data.toString());
})


const app = express();
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.get('/users', ((req, res) => {
    res.send(file);
}));

app.get('/users/:id', (req, res) => {
    const id = +req.params.id;

    if(id < 0 || isNaN(id)){
        res.status(400).send("Not valid values");
        return;
    }
    if(id>file.length){
        res.status(404).send(`No user with id ${id}`)
        return;
    }

    res.send(file[id])
})

app.put('/users', (req, res) => {
        console.log(req.body);
        res.send('sdad')
    }
)


app.listen(5000);