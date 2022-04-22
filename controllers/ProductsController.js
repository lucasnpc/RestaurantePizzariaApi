const client = require('../database')

const queryGetProducts = 'SELECT * FROM public."Product" WHERE "businessCnpj" = $1'
const queryInsertProduct = `INSERT INTO public."Product"("productName", "minimumStock", "maximumStock", "currentStock", "measurementUnit", "businessCnpj")
	VALUES ($1, $2, $3, $4, $5, $6);`

class ProductController {
    async getProducts(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(queryGetProducts, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postProduct(req, res) {
        const values = [req.body.productName, req.body.minimumStock,
        req.body.maximumStock, req.body.currentStock, req.body.measurementUnit, req.body.businessCnpj]
        await client.query(queryInsertProduct, values)
        res.send({
            success: true
        });
    }
}

module.exports = new ProductController();