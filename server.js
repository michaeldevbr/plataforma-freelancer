const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender produtos");
});

app.get('/usuarios', (req, res) => {
    res.send("Usuários cadastrados.");
});

app.get('/produtos', (req, res) => {
    res.send("Produtos cadastrados.");
});

app.post('/usuarios', (req, res) => {
    var nome = req.body["nome"];

    res.status(201).send("Usuário " + nome + " cadastrado com sucesso!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});