const express = require('express');

const MenuItemController = require('./controllers/MenuItemController');
const ClientController = require('./controllers/ClientController');
const EmployeeController = require('./controllers/EmployeeController');
const BusinessController = require('./controllers/BusinessController');
const UserController = require('./controllers/UserController');
const GainsController = require('./controllers/GainsController');
const ExpensesController = require('./controllers/ExpensesController');
const OrdersController = require('./controllers/OrdersController')

const routes = express.Router();

routes.get("/itens/getItem", MenuItemController.getItens);
routes.get("/itens/getItemCount", MenuItemController.getItemCount);
routes.post("/itens/postItem", MenuItemController.postItem);

routes.get('/caixa/getEntradas', GainsController.getGains);
routes.get('/caixa/getSaidas', ExpensesController.getExpenses);
routes.post('/caixa/postEntrada', GainsController.postGain)
routes.post('/caixa/postSaida', ExpensesController.postExpense);

routes.get('/clientes/getClientes', ClientController.getCustomers);
routes.post('/clientes/postCliente', ClientController.postCustomer)

routes.get('/funcionarios/getFuncionarios', EmployeeController.getEmployees);
routes.post('/funcionarios/postFuncionario', EmployeeController.postEmployee);

routes.post('/negocios/postNegocio', BusinessController.postBusiness);

routes.get('/usuarios/getUsuarios', UserController.getUsuarios);
routes.post('/usuarios/authUsuarios', UserController.authUsuario);
routes.post('/usuario/postUsuario', UserController.postUser);

routes.get('/dashboard/getPedidosTotal', OrdersController.getTotalOrders)
routes.get('/dashboard/getPedidosAtivos', OrdersController.getActiveOrders)
routes.get('/dashboard/getPedidosConcluidos', OrdersController.getConcludedOrders)
routes.get('/dashboard/getMenuTopItens', OrdersController.getTopMenuItems);
routes.get('/dashboard/getMesasTopVendas', OrdersController.getTopSalesDesks);
routes.get('/dashboard/getTotalEntradas', GainsController.getTotalGains)
routes.get('/dashboard/getTotalSaidas', ExpensesController.getTotalExpenses)

module.exports = routes;