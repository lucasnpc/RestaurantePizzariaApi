const client = require('../database')

const getTotalOrdersQuery = 'SELECT * FROM public."Orders" WHERE "businessCnpj" = $1'
const getActiveOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = false AND "businessCnpj" = $1;'
const getConcludedOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = true AND "businessCnpj" = $1;'
const querySelectLastOrder = 'SELECT "orderId" FROM public."Orders" WHERE "businessCnpj" = $1 ORDER BY "orderId" DESC LIMIT 1;'
const queryConcludeActiveOrder = 'UPDATE public."Orders" SET concluded=true WHERE "orderId"=$1;'
const queryGetItemsWithOrderId = 'SELECT "MenuItem"."itemId", price, description, "businessCnpj", "itemQuantity" ' +
    'FROM public."MenuItem" INNER JOIN "OrderMenuItems" ON "OrderMenuItems"."orderId" = $1 WHERE "MenuItem"."itemId" = "OrderMenuItems"."itemId";'

const queryInsertOrder = 'INSERT INTO public."Orders"("employeeCpf", "deskDescription", concluded, "businessCnpj", "dateTimeOrder")' +
    ' VALUES($1, $2, $3, $4, $5); '
const queryInsertMenuItemOrder = 'INSERT INTO public."OrderMenuItems"("orderId", "itemId", "itemQuantity")' +
    ' VALUES ($1, $2, $3);'

const queryDeleteAllMenuItemsFromOrderID = `DELETE FROM public."OrderMenuItems" WHERE "orderId" = $1;`

const queryGetAllOrderMenusItemsByOrderId = `SELECT "orderId", "itemId", "itemQuantity"
FROM public."OrderMenuItems" WHERE "orderId"=$1;`

const queryGetAllItemsByItemId = `SELECT "itemId", "productId", "productQuantity"
FROM public."MenuItemProducts" WHERE "itemId"=$1;`

const queryUpdateProductStock = `UPDATE public."Product" SET "currentStock"=$1 WHERE "productId"=$2;`

const queryGetProductByProductId = `SELECT * FROM public."Product" WHERE "productId" = $1`

class OrdersController {

    async getTotalOrders(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getTotalOrdersQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getActiveOrders(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getActiveOrdersQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getConcludedOrders(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getConcludedOrdersQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getItemsWithOrderId(req, res) {
        try {
            const values = [req.query.orderId]
            const dbRes = await client.query(queryGetItemsWithOrderId, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async postOrder(req, res) {
        try {
            const values = [req.body.employeeCpf, req.body.deskDescription, req.body.concluded, req.body.businessCnpj, req.body.dateTimeOrder]
            await client.query(queryInsertOrder, values)
            const dbRes = await client.query(querySelectLastOrder, [req.body.businessCnpj])
            res.send({
                success: true,
                orderId: dbRes.rows[0].orderId
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postOrderMenuItems(req, res) {
        try {
            const values = [req.body.orderId, req.body.itemId, req.body.itemQuantity]
            await client.query(queryInsertMenuItemOrder, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async updateActiveOrderToConcluded(req, res) {
        try {
            await client.query(queryConcludeActiveOrder, [req.body.orderId])
            await removeProductsFromStorage(req.body.orderId)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async updateOrderMenuItems(req, res) {
        try {
            const { orderId, items } = req.body
            await client.query(queryDeleteAllMenuItemsFromOrderID, [orderId])
            for (const item of items) {
                await client.query(queryInsertMenuItemOrder, [orderId, item.itemId, item.quantity])
            }
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }

}

async function removeProductsFromStorage(orderId) {
    const result = await client.query(queryGetAllOrderMenusItemsByOrderId, [orderId])
    for (const item of result.rows) {
        const { rows: products } = await client.query(queryGetAllItemsByItemId, [item.itemId])

        await updateProductsQuantity(products, Number(item.itemQuantity))
    }
}

async function updateProductsQuantity(products, quantity) {
    for (const product of products) {
        const { rows } = await client.query(queryGetProductByProductId, [product.productId])

        const currentProduct = rows[0]
        let newQuantity = Number(currentProduct.currentStock) - (Number(product.productQuantity) * quantity)

        if (newQuantity < 0) {
            newQuantity = 0
        }

        await client.query(queryUpdateProductStock, [newQuantity, product.productId])
    }
}

module.exports = new OrdersController();