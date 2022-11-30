const express = require('express');
const error = require('../middlewares/error');
const loginRouter = require('../routes');

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(error);

module.exports = app;
