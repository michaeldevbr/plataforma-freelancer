const express = require('express');
const app = express();
const rotas = require('./routes/rotas');

app.use(express.json());

app.use(rotas);

module.exports = app;
