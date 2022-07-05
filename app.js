require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require('./routers');
const {configs} = require("./config");

mongoose.connect(configs.MONGO_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter);
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

app.listen(configs.PORT, () => {
    console.log(`Started at port ${configs.PORT}`);
});


