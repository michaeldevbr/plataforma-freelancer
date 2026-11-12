const projetos = [];

module.exports = {
    cadastrarProjeto(projeto) {
            projetos.push(projeto);
            return "Projeto '" + projeto + "' foi cadastrado com sucesso!"; 
        },
    listarProjetos() {
        return projetos;
    }
};
