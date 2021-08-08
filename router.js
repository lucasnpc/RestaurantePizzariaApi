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
routes.post('/caixa/postEntrada', CaixaControler.postInflow)
routes.post('/caixa/postSaida', CaixaControler.postExpense);

routes.get('/clientes/getClientes', ClientesController.getClients);
routes.post('/clientes/postCliente', ClientesController.postClient)

routes.get('/contas/getContasAPagar', ContasController.getBillsToPay);
routes.get('/contas/getContasAReceber', ContasController.getBillsToReceive);
routes.post('/contas/postContasAPagar', ContasController.postBillToPay);
routes.post('/contas/postContasAReceber', ContasController.postBillToReceive);

routes.get('/funcionarios/getFuncionarios', FuncionariosController.getEmployees);
routes.post('/funcionarios/postFuncionario', FuncionariosController.postEmployee);

routes.get('/negocios/getNegocio', NegocioController.getNegocio);
routes.post('/negocios/postNegocio', NegocioController.postBusiness);

routes.get('/usuarios/getUsuarios', UsuarioController.getUsuarios);
routes.post('/usuarios/authUsuarios', UsuarioController.authUsuario);
routes.post('/usuario/postUsuario', UsuarioController.postUser);

module.exports = routes;