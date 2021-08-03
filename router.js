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

module.exports = routes;