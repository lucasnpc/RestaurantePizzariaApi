const client = require('../database')

const getTotalOrdersQuery = 'SELECT * FROM public."Orders" WHERE "businessCnpj" = $1'
const getActiveOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = false AND "businessCnpj" = $1;'
const getConcludedOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = true AND "businessCnpj" = $1;'
const queryGetTopMenuItems = 'SELECT "description" as "item", COUNT("description"::text) as "quantity", SUM("price") as "totalPrice"' +
    'FROM public."Orders" INNER JOIN "MenuItem" ON "Orders"."itemId" = "MenuItem"."itemId" WHERE "Orders"."businessCnpj" = $1' +
    'GROUP BY "item" ORDER BY "totalPrice" DESC LIMIT 3;'
const queryGetTopSalesDesks = 'SELECT "deskDescription" as "desk", COUNT("deskDescription") as "quantity", SUM("price") as "totalPrice" ' +
    'FROM public."Orders" INNER JOIN "MenuItem" ON "Orders"."itemId" = "MenuItem"."itemId" ' +
    'WHERE "Orders"."businessCnpj" = $1 GROUP BY "desk" ORDER BY "totalPrice" DESC LIMIT 3;'
const queryInsertOrder = 'INSERT INTO public."Orders"("employeeCpf", "deskDescription", concluded, "businessCnpj", "dateTimeOrder")' +
    ' VALUES($1, $2, $3, $4, $5); '
const queryInsertMenuItemOrder = 'INSERT INTO public."OrderMenuItems"("orderId", "itemId", "itemQuantity")' +
    ' VALUES ($1, $2, $3);'
const querySelectLastOrder = 'SELECT "orderId" FROM public."Orders" WHERE "businessCnpj" = $1 ORDER BY "orderId" DESC LIMIT 1;'
const queryConcludeActiveOrder = 'UPDATE public."Orders" SET concluded=true WHERE "orderId"=$1;'

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

    async getTopMenuItems(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(queryGetTopMenuItems, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getTopSalesDesks(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(queryGetTopSalesDesks, values)
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
                sucess: true,
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
                sucess: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async updateActiveOrderToConcluded(req, res) {
        try {
            await client.query(queryConcludeActiveOrder, [req.body.orderId])
            res.send({
                sucess: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new OrdersController();