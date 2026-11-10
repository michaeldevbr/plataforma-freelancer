const projetos = require('./repository');

module.exports ={
    cadastrar_projeto(projeto) {
        
        if(typeof projeto !== "string" || !projeto.trim()){
            throw new Error("O projeto deve ter um nome.");
        };

        return projetos.cadastrar_projeto(projeto.trim());
    },
    listar_projetos() {
        return projetos.listar_projetos();
    }
};