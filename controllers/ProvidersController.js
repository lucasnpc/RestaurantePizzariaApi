const client = require('../database')

const queryGetProviders = `SELECT * FROM public."Provider" WHERE "businessCnpj" = $1 AND decommissioned!=true;`
const queryPostProvider = `INSERT INTO public."Provider"(
	"providerCnpj", "businessCnpj", "corporateName", street, "number", district, city, state, phone, email, decommissioned)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`
const queryUpdateProvider = `UPDATE public."Provider"
	SET "providerCnpj"=$1, "businessCnpj"=$2, "corporateName"=$3, street=$4, "number"=$5, district=$6, city=$7, state=$8, phone=$9, email=$10
	WHERE "providerCnpj"=$1;`
const queryDeleteProvider = `UPDATE public."Provider" SET decommissioned=true
	WHERE "providerCnpj"=$1;`

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
            req.body.city, req.body.state, req.body.phone, req.body.email, req.body.decommissioned]
            await client.query(queryPostProvider, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async updateProvider(req, res) {
        try {
            const values = [req.body.providerCnpj, req.body.businessCnpj, req.body.corporateName, req.body.street, req.body.number, req.body.district,
            req.body.city, req.body.state, req.body.phone, req.body.email]
            await client.query(queryUpdateProvider, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async disableProvider(req, res) {
        try {
            const values = [req.query.id]
            await client.query(queryDeleteProvider, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProvidersController();