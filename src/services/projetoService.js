const projetosRepository = require('../repositories/projetoRepository');

module.exports = {
    cadastrarProjeto(projeto) {
        
        if(typeof projeto !== "string" || !projeto.trim()){
            throw new Error("O projeto deve ter um nome.");
        }

        const possuiLetra = /\p{L}/u;

        if(!possuiLetra.test(projeto)) {
            throw new Error("O nome do projeto não pode ser apenas números ou símbolos.");
        }

        return projetosRepository.cadastrarProjeto(projeto.trim());
    },
    listarProjetos() {
        return projetosRepository.listarProjetos();
    }
};
