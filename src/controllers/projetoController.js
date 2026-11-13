const projetosService = require('../services/projetoService');

function apresentarSistema(req, res) {
    return res.json("Esta é uma plataforma freelancer onde qualquer pessoa pode se cadastrar e comprar e vender seus projetos ou produtos");
}

async function listar(req, res) {
        try {
        const projetos = await projetosService.listarProjetos(req.query);

        console.log("Projetos encontrados:", projetos);

        return res.json(projetos);

    } catch (erro) {
        console.error("Erro ao listar:", erro);

        return res.status(500).json({
            erro: "Erro ao listar projetos."
        });
    }
}

async function cadastrar(req, res) {
    try {
        const projeto = await projetosService.cadastrarProjeto(req.body);

        return res.status(201).json(projeto);
    } catch (erro) {
        return res.status(400).json({"erro": erro.message});
    }
}

module.exports = {apresentarSistema, listar, cadastrar};