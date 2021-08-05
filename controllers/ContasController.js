const client = require('../database')

const getBillsToPayQuery = 'SELECT * FROM "ContasAPagar"'
const getBillsToReceiveQuery = 'SELECT * FROM "ContasAReceber"'

class ContasController {
    async getContasAPagar(req, res) {
        try {
            const dbRes = await client.query(getBillsToPayQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getContasAReceber(req, res) {
        try {
            const dbRes = await client.query(getBillsToReceiveQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ContasController();