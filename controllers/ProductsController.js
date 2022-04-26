const client = require('../database')

const queryGetProducts = 'SELECT * FROM public."Product" WHERE "businessCnpj" = $1'
const queryInsertProduct = `INSERT INTO public."Product"("productName", "minimumStock", "maximumStock", "currentStock", 
    "measurementUnit", "businessCnpj", barcode, "productBatch", "costValue", "providerCnpj")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`
const queryUpdateProductStock = `UPDATE public."Product" SET "currentStock"=$1 WHERE "productId"=$2;`

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
        try {
            const values = [req.body.productName, req.body.minimumStock,
            req.body.maximumStock, req.body.currentStock, req.body.measurementUnit, req.body.businessCnpj, req.body.barcode,
            req.body.productBatch, req.body.costValue, req.body.providerCnpj]
            await client.query(queryInsertProduct, values)
            res.send({
                success: true
            });
        } catch (error) {
            console.log(error);
        }
    }
    async updateProductCurrentStock(req, res) {
        try {
            const values = [req.body.stock, req.body.id]
            await client.query(queryUpdateProductStock, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductController();