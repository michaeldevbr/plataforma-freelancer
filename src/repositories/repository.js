const projetos = [];

module.exports = {
    cadastrar_projeto(projeto) {
            projetos.push(projeto);
            return "Projeto '" + projeto + "' foi cadastrado com sucesso!"; 
        },
    listar_projetos() {
        return projetos;
    }
};
