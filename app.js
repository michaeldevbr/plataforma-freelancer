const express = require('express');
const app = express();
const projetos = require('./service');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender seus projetos ou produtos");
});

app.get('/projetos', (req, res) => {
    res.json(projetos.listar_projetos());
});

app.post('/projetos', (req, res) => {
    try {
    const projeto = req.body["projeto"];

    const mensagem = projetos.cadastrar_projeto(projeto);

    res.status(201).json(mensagem);
    } catch (erro) {
        res.status(400).json({"erro": erro.message});
    };
});

module.exports = app;
