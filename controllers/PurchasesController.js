const client = require('../database');

queryPostPurchase = `INSERT INTO public."ProductPurchase"(
	description, "quantityPurchased", "unitCostValue", "productId", "businessCnpj", "datePurchased", "productBatch",
    "providerCnpj", "expirationDate")
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`

class PurchasesController {
    async postPurchase(req, res) {
        try {
            const values = [req.body.description,
            req.body.quantityPurchased,
            req.body.unitCostValue,
            req.body.productId,
            req.body.businessCnpj,
            req.body.datePurchased,
            req.body.productBatch,
            req.body.provider.providerCnpj,
            req.body.expirationDate
            ]
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