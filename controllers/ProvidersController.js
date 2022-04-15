const client = require('../database')

const queryGetProviders = `SELECT * FROM public."Provider" WHERE "businessCnpj" = $1;`

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
}

module.exports = new ProvidersController();