const client = require('../database')

const getClientsQuery = 'SELECT * FROM "Clientes"'
const queryInsertClient = 'INSERT INTO "Clientes"(telefone, nome, numero, rua, bairro, cidade)' +
    'VALUES ($1, $2, $3, $4, $5, $6);'

class ClientesController {
    async getCustomers(req, res) {
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
    async postCustomer(req, res) {
        const values = [req.body.telefone, req.body.nome,
        req.body.numero, req.body.rua, req.body.bairro, req.body.cidade]
        const dbRes = await client.query(queryInsertClient, values)
        res.send({
            success: true
        });
    }
}

module.exports = new ClientesController();