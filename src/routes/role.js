const express = require('express');
const Route = express.Router();

// check token.
// const { middleware } = require('../auth');

const { readRole } = require('../controllers/role');

Route
    .get('/', readRole)

module.exports = Route