const client = require('../database')

const getOrdersQuery = 'SELECT * FROM "Entradas"'
const getExpensesQuery = 'SELECT * FROM "Saidas"'

class CaixaControler {

    async getEntradas(req, res) {
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
    async getSaidas(req, res) {
        try {
            const dbRes = await client.query(getExpensesQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CaixaControler();