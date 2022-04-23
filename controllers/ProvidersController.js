const client = require('../database')

const queryGetProviders = `SELECT * FROM public."Provider" WHERE "businessCnpj" = $1;`
const queryPostProvider = `INSERT INTO public."Provider"(
	"providerCnpj", "businessCnpj", "corporateName", street, "number", district, city, state, phone, email)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`

class ProvidersController {
    async getProviders(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(queryGetProviders, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

    async postProvider(req, res) {
        try {
            const values = [req.body.providerCnpj, req.body.businessCnpj, req.body.corporateName, req.body.street, req.body.number, req.body.district,
            req.body.city, req.body.state, req.body.phone, req.body.email]
            await client.query(queryPostProvider, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProvidersController();