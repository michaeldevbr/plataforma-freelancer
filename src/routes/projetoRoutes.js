const rotas = require('express').Router();
const funcoesController = require('../controllers/projetoController');

rotas.get('/', funcoesController.apresentarSistema);
rotas.get('/projetos', funcoesController.listar);
rotas.post('/projetos', funcoesController.cadastrar);

module.exports = rotas;
