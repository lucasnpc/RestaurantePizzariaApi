const client = require('../database')

const getTotalOrdersQuery = 'SELECT COUNT(*) FROM public."Orders" WHERE "businessCnpj" = $1'
const getActiveOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = false AND "businessCnpj" = $1;'
const getConcludedOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = true AND "businessCnpj" = $1;'
const queryGetTopMenuItems = 'SELECT "description" as "item", COUNT("description"::text) as "quantity", SUM("price") as "totalPrice"' +
    'FROM public."Orders" INNER JOIN "MenuItem" ON "Orders"."itemId" = "MenuItem"."itemId" WHERE "Orders"."businessCnpj" = $1' +
    'GROUP BY "item" ORDER BY "totalPrice" DESC LIMIT 3;'
const queryGetTopSalesDesks = 'SELECT "deskDescription" as "desk", COUNT("deskDescription") as "quantity", SUM("price") as "totalPrice" ' +
    'FROM public."Orders" INNER JOIN "MenuItem" ON "Orders"."itemId" = "MenuItem"."itemId" ' +
    'WHERE "Orders"."businessCnpj" = $1 GROUP BY "desk" ORDER BY "totalPrice" DESC LIMIT 3;'

class OrdersController {

    async getTotalOrders(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getTotalOrdersQuery, values)
            res.send({
                success: true,
                data: dbRes.rows[0].count
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
}

module.exports = new OrdersController();