const client = require('../database')

const getClientsQuery = 'SELECT * FROM public."Client" WHERE "businessCnpj" = $1'
const queryInsertClient = 'INSERT INTO public."Client"(name, street, "number", district, city, phone, "businessCnpj")' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7);'
const queryUpdateClient = `UPDATE public."Client" SET name=$2, street=$3, "number"=$4, district=$5, city=$6, phone=$7, "businessCnpj"=$8
	WHERE "clientId"=$1;`
const queryDeleteClient = `DELETE FROM public."Client"
	WHERE "clientId"=$1;`

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
    async putCustomer(req, res) {
        const values = [req.body.clientId, req.body.name, req.body.street,
        req.body.number, req.body.district, req.body.city, req.body.phone, req.body.businessCnpj]
        await client.query(queryUpdateClient, values)
        res.send({
            success: true
        });
    }
    async deleteCustomer(req, res) {
        try {
            const values = [req.query.id]
            await client.query(queryDeleteClient, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ClientController();