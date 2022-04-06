const client = require('../database')

const queryInsertBusiness = 'INSERT INTO public."Business"(cnpj, "corporateName", street, "number", district, city, state)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7);'

class BusinessController {

    async postBusiness(req, res) {
        try {
            const values = [req.body.cnpj, req.body.corporateName, req.body.street, req.body.number, req.body.district,
            req.body.city, req.body.state]
            await client.query(queryInsertBusiness, values)
            res.send({
                success: true,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

module.exports = new BusinessController();