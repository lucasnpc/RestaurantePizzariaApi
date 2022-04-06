const client = require('../database')

const getClientsQuery = 'SELECT * FROM public."Client" WHERE "businessCnpj" = $1'
const queryInsertClient = 'INSERT INTO public."Client"(name, street, "number", district, city, phone, "businessCnpj")' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7);'

class ClientController {
    async getCustomers(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getClientsQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postCustomer(req, res) {
        const values = [req.body.name, req.body.street,
        req.body.number, req.body.district, req.body.city, req.body.phone, req.body.businessCnpj]
        await client.query(queryInsertClient, values)
        res.send({
            success: true
        });
    }
}

module.exports = new ClientController();