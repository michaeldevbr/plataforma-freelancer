const express = require('express');
const app = express();
const projetos = require('./repository');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender seus projetos ou produtos");
});

app.get('/projetos', (req, res) => {
    res.json(projetos.listar_projetos());
});

app.post('/projetos', (req, res) => {
    const projeto = req.body["projeto"];

    const mensagem = projetos.cadastrar_projeto(projeto);

    res.status(201).json(mensagem);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});