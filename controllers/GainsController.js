const client = require('../database')

const getOrdersQuery = 'SELECT * FROM public."Gains"'
const queryInsertInflow = 'INSERT INTO public."Gains"("deskDescription", "menuItems", value, "paymentWay", "gainDate", "employeeCpf",' +
    '"additionalValue", "businessCnpj") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
const queryGetTopMenuItems = 'SELECT unnest("menuItems") as "item", COUNT("menuItems"::text) as "quantity", SUM("value") as "totalPrice"' +
    ' FROM public."Gains" GROUP BY "item" ORDER BY "totalPrice" DESC LIMIT 3;'
const queryGetTopSalesDesks = 'SELECT "deskDescription" as "desk", COUNT("deskDescription") as "quantity", SUM("value") as "totalPrice"' +
    'FROM public."Gains" GROUP BY "desk" ORDER BY "totalPrice" DESC LIMIT 3;'

class GainsController {

    async getGains(req, res) {
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
    async postGain(req, res) {
        try {
            const values = [req.body.deskDescription, req.body.menuItems, req.body.value, req.body.paymentWay, req.body.gainDate,
            req.body.employeeCpf, req.body.additionalValue, req.body.businessCnpj];
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