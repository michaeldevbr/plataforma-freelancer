const ProjetoRepository = require('../repositories/projetoRepository');
const {abrirBanco} = require('../database/connection');

const db = abrirBanco();
const projetoRepository = new ProjetoRepository(db);

module.exports = {
    async cadastrarProjeto(projeto) {
        
        if(!projeto || typeof projeto !== "object"){
            throw new Error("O projeto deve ter um nome.");
        }

        const possuiLetra = /\p{L}/u;

        if(!possuiLetra.test(projeto)) {
            throw new Error("O nome do projeto não pode ser apenas números ou símbolos.");
        }

        return await projetoRepository.criar(projeto);
    },
    async listarProjetos(filtros = {}) {
        return await projetoRepository.listar(filtros);
    }
};
