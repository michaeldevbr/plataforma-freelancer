const rotas = require('express').Router();
const funcoesController = require('../controllers/projetoController');

rotas.get('/', funcoesController.apresentarSistema); //rota de apresentação do sistema
rotas.get('/projetos', funcoesController.listar); //rota de listar os projetos existentes
rotas.post('/projetos', funcoesController.cadastrar); //rota de cadastrar projetos

module.exports = rotas;
