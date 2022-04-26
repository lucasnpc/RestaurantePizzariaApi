const client = require('../database');

queryPostPurchase = `INSERT INTO public."ProductPurchase"(
	description, "quantityPurchased", "totalCostValue", "productId", "businessCnpj", "datePurchased")
	VALUES ($1, $2, $3, $4, $5, $6);`

class PurchasesController {
    async postPurchase(req, res) {
        try {
            const values = [req.body.description, req.body.quantityPurchased, req.body.totalCostValue,
            req.body.productId, req.body.businessCnpj, req.body.datePurchased]
            await client.query(queryPostPurchase, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PurchasesController()