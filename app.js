const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/user.router');

mongoose.connect('mongodb://localhost:27017/dec');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(400).json('Unknown routes');
})

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || "Unknown error",
            status: err.status || 500
        })
})

app.listen(5000, () => {
    console.log('Started at port 5000');
});


