const projetos = [];

module.exports = {
    cadastrar_projeto(projeto){
        projetos.push(projeto);
        return "Projeto " + projeto + " cadastrado com sucesso!";
    },
    listar_projetos(){
        return projetos;
    }
};