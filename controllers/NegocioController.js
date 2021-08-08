const client = require('../database')

const queryInsertBusiness = 'INSERT INTO "Negocio"("idNegocio", nome, rua, numero, bairro, cidade, estado)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7);'
class NegocioController {
    async getNegocio(req, res) {
        try {

        } catch (error) {
            console.log(error);
        }
    }
    async postBusiness(req, res) {
        try {
            const values = [req.body.idNegocio, req.body.nome, req.body.rua, req.body.numero, req.body.bairro, req.body.cidade,
            req.body.estado]
            const dbRes = await client.query(queryInsertBusiness, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new NegocioController();