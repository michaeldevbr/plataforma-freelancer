const express = require('express');
const app = express();
const rotas = require('./routes/projetoRoutes');

app.use(express.json());

app.use(rotas);

module.exports = app;
