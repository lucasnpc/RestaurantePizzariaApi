const client = require('../database')

const getClientsQuery = 'SELECT * FROM public."Client"'
const queryInsertClient = 'INSERT INTO public."Client"("clientId", name, street, "number", district, city, phone, "businessCnpj")' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'

class ClientController {
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

module.exports = new ClientController();