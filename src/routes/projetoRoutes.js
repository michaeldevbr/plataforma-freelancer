const rotas = require('express').Router();
const funcoes_controller = require('../controllers/projetoController');

rotas.get('/', funcoes_controller.apresentar_sistema); //rota de apresentação do sistema
rotas.get('/projetos', funcoes_controller.listar); //rota de listar os projetos existentes
rotas.post('/projetos', funcoes_controller.cadastrar); //rota de cadastrar projetos

module.exports = rotas;
