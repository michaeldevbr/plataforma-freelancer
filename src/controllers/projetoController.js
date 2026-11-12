const projetosService = require('../services/projetoService');

function apresentarSistema(req, res) {
    return res.json("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender seus projetos ou produtos");
}

function listar(req, res) {
    return res.json(projetosService.listarProjetos());
}

function cadastrar(req, res) {
    try {
        const mensagem = projetosService.cadastrarProjeto(req.body["projeto"]);

        return res.status(201).json(mensagem);
    } catch (erro) {
        return res.status(400).json({"erro": erro.message});
    }
}

module.exports = {apresentarSistema, listar, cadastrar};