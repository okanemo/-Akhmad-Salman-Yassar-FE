const express = require('express');
const app = express();
const time = require('morgan');
const { urlencoded } = require('body-parser');
const cors = require('cors')

const callRoute = require('./src/routes');
const { port } = require('./src/configs/mysql');

app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use(time('dev'))
app.use('/', cors(), callRoute)
app.listen(port, () => console.log(`PORT: ${port}`))