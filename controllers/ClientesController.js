const client = require('../database')

const getClientsQuery = 'SELECT * FROM "Clientes"'
const queryInsertClient = 'INSERT INTO "Clientes"("idCliente", telefone, nome, numero, rua, bairro, cidade)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7);'

class ClientesController {
    async getClients(req, res) {
        try {
            const dbRes = await client.query(getClientsQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postClient(req, res) {
        const values = [req.body.idCliente, req.body.telefone, req.body.nome,
        req.body.numero, req.body.rua, req.body.bairro, req.body.cidade]
        const dbRes = await client.query(queryInsertClient, values)
        res.send({
            success: true
        });
    }
}

module.exports = new ClientesController();