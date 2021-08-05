const client = require('../database')

const getClientsQuery = 'SELECT * FROM "Clientes"'

class ClientesController {
    async getClientes(req, res) {
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
}

module.exports = new ClientesController();