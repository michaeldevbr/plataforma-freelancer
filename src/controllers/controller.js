const projetos_service = require('../services/service');

function apresentar_sistema(req, res) {
    return res.json("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender seus projetos ou produtos");
}

function listar(req, res) {
    return res.json(projetos_service.listar_projetos());
}

function cadastrar(req, res) {
    try {
        const mensagem = projetos_service.cadastrar_projeto(req.body["projeto"]);

        return res.status(201).json(mensagem);
    } catch (erro) {
        return res.status(400).json({"erro": erro.message});
    }
}

module.exports = {apresentar_sistema, listar, cadastrar};