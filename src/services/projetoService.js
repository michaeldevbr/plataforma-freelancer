const ProjetoRepository = require('../repositories/projetoRepository');
const {abrirBanco} = require('../database/connection');
const {CATEGORIAS, STATUS} = require('../models/projetoModel');

const db = abrirBanco();
const projetoRepository = new ProjetoRepository(db);

class ErroDeValidacao extends Error {}

function validarProjeto(projeto) {
    if (!projeto || typeof projeto !== "object") {
        throw new ErroDeValidacao("Os dados do projeto são obrigatórios.");
    }

    const {titulo, descricao, categoria, habilidades_requeridas, orcamento, prazo, status} = projeto;
    const possuiLetra = /\p{L}/u;

    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new ErroDeValidacao("O título deve ter pelo menos 5 caracteres.");
    }

    if (!possuiLetra.test(titulo)) {
        throw new ErroDeValidacao("O título deve conter pelo menos uma letra.");
    }

    if (typeof descricao !== "string" || descricao.trim().length < 30) {
        throw new ErroDeValidacao("A descrição deve ter pelo menos 30 caracteres.");
    }

    if (!CATEGORIAS.includes(categoria)) {
        throw new ErroDeValidacao("Categoria inválida. Use uma destas: " + CATEGORIAS.join(", ") + ".");
    }

    if (habilidades_requeridas != null && typeof habilidades_requeridas !== "string") {
        throw new ErroDeValidacao("As habilidades requeridas devem ser um texto.");
    }

    if (typeof orcamento !== "number" || !(orcamento > 0)) {
        throw new ErroDeValidacao("O orçamento deve ser um número maior que zero.");
    }

    if (!Number.isInteger(prazo) || prazo <= 0) {
        throw new ErroDeValidacao("O prazo deve ser um número inteiro de dias maior que zero.");
    }

    if (status !== undefined && !STATUS.includes(status)) {
        throw new ErroDeValidacao("Status inválido. Use um destes: " + STATUS.join(", ") + ".");
    }
}

module.exports = {
    ErroDeValidacao,

    async cadastrarProjeto(projeto) {
        validarProjeto(projeto);

        return await projetoRepository.criar({
            ...projeto,
            titulo: projeto.titulo.trim(),
            descricao: projeto.descricao.trim()
        });
    },
    async listarProjetos(filtros = {}) {
        return await projetoRepository.listar(filtros);
    }
};
