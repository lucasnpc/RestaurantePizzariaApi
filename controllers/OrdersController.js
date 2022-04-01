const client = require('../database')

const getTotalOrdersQuery = 'SELECT COUNT(*) FROM public."Orders"'
const getActiveOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = false;'
const getConcludedOrdersQuery = 'SELECT * FROM public."Orders" WHERE concluded = true;'

class OrdersController {

    async getTotalOrders(req, res) {
        try {
            const dbRes = await client.query(getTotalOrdersQuery)
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
            const dbRes = await client.query(getActiveOrdersQuery)
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
            const dbRes = await client.query(getConcludedOrdersQuery)
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