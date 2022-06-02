const express = require('express');

const MenuItemController = require('./controllers/MenuItemController');
const ClientController = require('./controllers/ClientController');
const EmployeeController = require('./controllers/EmployeeController');
const BusinessController = require('./controllers/BusinessController');
const UserController = require('./controllers/UserController');
const GainsController = require('./controllers/GainsController');
const ExpensesController = require('./controllers/ExpensesController');
const OrdersController = require('./controllers/OrdersController');
const ProvidersController = require('./controllers/ProvidersController');
const ProductsController = require('./controllers/ProductsController');
const PurchasesController = require('./controllers/PurchasesController');
const KitchenController = require('./controllers/KitchenController');
const DesksController = require('./controllers/DesksController');

const routes = express.Router();

routes.get("/itens/getItem", MenuItemController.getItens);
routes.get("/itens/getItemCount", MenuItemController.getItemCount);
routes.post("/itens/postItem", MenuItemController.postItem);
routes.post("/itens/postProdutoItem", MenuItemController.postMenuItemProduct)

routes.get('/caixa/getEntradas', GainsController.getGains);
routes.get('/caixa/getSaidas', ExpensesController.getExpenses);
routes.post('/caixa/postEntrada', GainsController.postGain)
routes.post('/caixa/postSaida', ExpensesController.postExpense);

//Routes for Clients
routes.get('/clientes/getClientes', ClientController.getCustomers);
routes.post('/clientes/postCliente', ClientController.postCustomer)
routes.put('/clientes/putCliente', ClientController.putCustomer)
routes.delete('/clientes/deleteCliente', ClientController.deleteCustomer)

//Routes for Employees
routes.get('/funcionarios/getFuncionarios', EmployeeController.getEmployees);
routes.post('/funcionarios/postFuncionario', EmployeeController.postEmployee);
routes.put('/funcionarios/putFuncionario', EmployeeController.updateEmployee)
routes.delete('/funcionarios/deleteFuncionario', EmployeeController.unactivateEmployee)

routes.post('/negocios/postNegocio', BusinessController.postBusiness);

routes.get('/usuarios/getUsuarios', UserController.getUsuarios);
routes.post('/usuarios/authUsuarios', UserController.authUsuario);
routes.post('/usuario/postUsuario', UserController.postUser);

//Routes for orders
routes.get('/dashboard/getPedidosTotal', OrdersController.getTotalOrders)
routes.get('/dashboard/getPedidosAtivos', OrdersController.getActiveOrders)
routes.get('/dashboard/getPedidosConcluidos', OrdersController.getConcludedOrders)
routes.get('/dashboard/getTotalEntradas', GainsController.getTotalGains);
routes.get('/dashboard/getTotalSaidas', ExpensesController.getTotalExpenses);
routes.get('/inicio/getMesasOcupadas', OrdersController.getOccupiedDesks);
routes.get('/inicio/getPedidosClienteComPedidoId', OrdersController.getClientOrdersWithOrderId);
routes.get('/inicio/getItensComPedidoClienteId', OrdersController.getItemsWithClientOrderId);
routes.post('/inicio/postPedido', OrdersController.postOrder);
routes.post('/inicio/postPedidoCliente', OrdersController.postClientOrder);
routes.post('/inicio/postItensPedidosCliente', OrdersController.postClientOrdersItems);
routes.post('/inicio/updatePedidoItens', OrdersController.updateOrderMenuItems);
routes.post('/dashboard/postAtualizaPedidoAtivoConcluido', OrdersController.updateActiveOrderToConcluded);

//Routes for Providers
routes.get('/fornecedores/getFornecedores', ProvidersController.getProviders);
routes.post('/fornecedores/postFornecedor', ProvidersController.postProvider)
routes.put('/fornecedores/putFornecedor', ProvidersController.updateProvider)
routes.delete('/fornecedores/deleteFornecedor', ProvidersController.disableProvider)

//Routes for Products
routes.get('/produtos/getProdutos', ProductsController.getProducts)
routes.post('/produtos/postProduto', ProductsController.postProduct)
routes.put('/produtos/updateEstoqueAtualProduto', ProductsController.updateProductCurrentStock)

//Routes for purchases
routes.post('/compras/postCompra', PurchasesController.postPurchase)

//Routes for Kitchen
routes.get('/cozinha/getPedidosEnviados', KitchenController.getSentClientOrders)
routes.put('/cozinha/updatePedidoStatus', KitchenController.updateOrderStatus)

//Routes for Desks
routes.get('/mesas/getMesas', DesksController.getDesks)

module.exports = routes;