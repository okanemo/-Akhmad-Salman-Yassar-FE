const express = require('express');
const Route = express.Router();

const userRouter = require('./user');
const roleRouter = require('./role');

Route
    .use('/user', userRouter)
    .use('/role', roleRouter)

module.exports = Route