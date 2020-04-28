const express = require('express');
const Route = express.Router();

// check token.
// const { middleware } = require('../auth');

const { login, createUser, readUser, updateUser, deleteUser, detailUser, changePassword } = require('../controllers/user');

Route
    .post('/login', login)
    .post('/', createUser)
    .get('/', readUser)
    .patch('/:id', updateUser)
    .delete('/:id', deleteUser)
    .get('/:id', detailUser)
    .patch('/change-password/:id', changePassword)

module.exports = Route