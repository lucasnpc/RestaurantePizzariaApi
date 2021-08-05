const express = require('express');

const CaixaControler = require('./controllers/CaixaController');
const CardapioController = require('./controllers/CardapioController');
const ClientesController = require('./controllers/ClientesController');
const ContasController = require('./controllers/ContasController');
const FuncionariosController = require('./controllers/FuncionariosController');
const NegocioController = require('./controllers/NegocioController');
const UsuarioController = require('./controllers/UsuarioController');

const routes = express.Router();

routes.get("/itens/getItem", CardapioController.getItens);
routes.get("/itens/getItemCount", CardapioController.getItemCount);
routes.post("/itens/postItem", CardapioController.postItem);

routes.get('/caixa/getEntradas', CaixaControler.getEntradas);
routes.get('/caixa/getSaidas', CaixaControler.getSaidas);

routes.get('/clientes/getClientes', ClientesController.getClientes);

routes.get('/contas/getContasAPagar', ContasController.getContasAPagar);
routes.get('/contas/getContasAReceber', ContasController.getContasAReceber);

routes.get('/funcionarios/getFuncionarios', FuncionariosController.getFuncionarios);

routes.get('/negocios/getNegocio', NegocioController.getNegocio);

routes.get('/usuarios/getUsuarios', UsuarioController.getUsuarios);
routes.post('/usuarios/authUsuarios', UsuarioController.authUsuario)

module.exports = routes;