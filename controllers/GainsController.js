const client = require('../database')

const getOrdersQuery = 'SELECT * FROM public."Gains"'
const queryInsertInflow = 'INSERT INTO public."Gains"("gainId", "deskDescription", "menuItems", value, "paymentWay", "gainDate", "employeeCpf",'+
 '"additionalValue", "businessCnpj") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
const queryGetTopMenuItems = 'SELECT unnest("menuItems") as "item", COUNT("menuItems"::text) as "quantity", SUM("value") as "totalPrice"' +
    ' FROM public."Gains" GROUP BY "item" ORDER BY "value" DESC LIMIT 3;'
const queryGetTopSalesDesks = 'SELECT "deskDescription" as "desk", COUNT("deskDescription") as "quantity", SUM("value") as "totalPrice"' +
    'FROM public."Gains" GROUP BY "desk" ORDER BY "value" DESC LIMIT 3;'

class GainsController {

    async getInflows(req, res) {
        try {
            const dbRes = await client.query(getOrdersQuery)
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
            const dbRes = await client.query(queryGetTopMenuItems)
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
            const dbRes = await client.query(queryGetTopSalesDesks)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postInflow(req, res) {
        try {
            const values = [req.body.numeroMesa, req.body.itensCardapio, req.body.valorConta, req.body.formaPagamento];
            await client.query(queryInsertInflow, values)
            res.send({
                success: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new GainsController();