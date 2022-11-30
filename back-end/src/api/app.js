const express = require('express');
const { loginRouter } = require('../routes');

const app = express();

app.use(loginRouter)

module.exports = app;
