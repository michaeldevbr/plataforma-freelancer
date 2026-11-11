const projetos = require('./repository');

module.exports ={
    cadastrar_projeto(projeto) {
        
        if(typeof projeto !== "string" || !projeto.trim()){
            throw new Error("O projeto deve ter um nome.");
        };

        const validar_projeto = /\p{L}/u; //procedimento chamado de regex

        if(!validar_projeto.test(projeto)) {
            throw new Error("O nome do projeto não pode ser apenas números ou símbolos.");
        };

        return projetos.cadastrar_projeto(projeto.trim());
    },
    listar_projetos() {
        return projetos.listar_projetos();
    }
};
