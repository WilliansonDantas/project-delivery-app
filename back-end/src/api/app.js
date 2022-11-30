const express = require('express');
const { loginRouter, registerRouter } = require('../routes');

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
module.exports = app;
