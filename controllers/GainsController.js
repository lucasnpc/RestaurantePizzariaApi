const client = require('../database')

const getGainsQuery = 'SELECT * FROM public."Gains" WHERE "businessCnpj" = $1'
const queryInsertGain = `INSERT INTO public."Gains"(
	value, "paymentWay", "gainDate", "additionalValue", "businessCnpj") VALUES ($1, $2, $3, $4, $5);`
const getTotalGainsQuery = 'SELECT SUM(value) as total FROM public."Gains" WHERE "businessCnpj" = $1;'

class GainsController {

    async getGains(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getGainsQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getTotalGains(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getTotalGainsQuery, values)
            res.send({
                success: true,
                data: dbRes.rows[0].total
            })
        } catch (error) {
            console.log(error);
        }
    }

    async postGain(req, res) {
        try {
            const values = [req.body.value, req.body.paymentWay, req.body.gainDate,
            req.body.additionalValue, req.body.businessCnpj];
            await client.query(queryInsertGain, values)
            res.send({
                success: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new GainsController();