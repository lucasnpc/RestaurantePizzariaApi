const client = require('../database')

const queryInsertBusiness = 'INSERT INTO "Negocio"(nome, rua, numero, bairro, cidade, estado)' +
    'VALUES ($1, $2, $3, $4, $5, $6);'
const queryGetBusinessId = 'SELECT COUNT(*) FROM "Negocio";'
class NegocioController {
    async getBusiness(req, res) {
        try {

        } catch (error) {
            console.log(error);
        }
    }
    async postBusiness(req, res) {
        try {
            const values = [req.body.nome, req.body.rua, req.body.numero, req.body.bairro, req.body.cidade,
            req.body.estado]
            const dbRes = await client.query(queryInsertBusiness, values)
            const dbResCount = await client.query(queryGetBusinessId)
            res.send({
                success: true,
                businessId: dbResCount.rows[0].count
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new NegocioController();