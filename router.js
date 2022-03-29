const express = require('express');

const MenuItemController = require('./controllers/MenuItemController');
const ClientController = require('./controllers/ClientController');
const EmployeeController = require('./controllers/EmployeeController');
const BusinessController = require('./controllers/BusinessController');
const UserController = require('./controllers/UserController');
const GainsController = require('./controllers/GainsController');
const ExpensesController = require('./controllers/ExpensesController');

const routes = express.Router();

routes.get("/itens/getItem", MenuItemController.getItens);
routes.get("/itens/getItemCount", MenuItemController.getItemCount);
routes.post("/itens/postItem", MenuItemController.postItem);

routes.get('/caixa/getEntradas', GainsController.getInflows);
routes.get('/caixa/getSaidas', ExpensesController.getExpenses);
routes.post('/caixa/postEntrada', GainsController.postInflow)
routes.post('/caixa/postSaida', ExpensesController.postExpense);
routes.get('/caixa/getTopMenuItems', GainsController.getTopMenuItems);
routes.get('/caixa/getTopSalesDesks', GainsController.getTopSalesDesks);

routes.get('/clientes/getClientes', ClientController.getCustomers);
routes.post('/clientes/postCliente', ClientController.postCustomer)

routes.get('/funcionarios/getFuncionarios', EmployeeController.getEmployees);
routes.post('/funcionarios/postFuncionario', EmployeeController.postEmployee);

routes.get('/negocios/getNegocio', BusinessController.getBusiness);
routes.post('/negocios/postNegocio', BusinessController.postBusiness);

routes.get('/usuarios/getUsuarios', UserController.getUsuarios);
routes.post('/usuarios/authUsuarios', UserController.authUsuario);
routes.post('/usuario/postUsuario', UserController.postUser);

module.exports = routes;