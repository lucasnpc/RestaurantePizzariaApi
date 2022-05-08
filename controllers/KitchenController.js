const client = require('../database')

const querySentClientOrders = `SELECT "deskDescription", "ClientOrdersItems"."clientOrderId" FROM public."Orders" INNER JOIN "ClientOrders" 
ON "ClientOrders"."orderId" = "Orders"."orderId" INNER JOIN "ClientOrdersItems" ON "ClientOrders"."clientOrderId" = "ClientOrdersItems"."clientOrderId"
WHERE "orderStatus"='enviado' OR "orderStatus"='preparando' GROUP BY "deskDescription", "ClientOrdersItems"."clientOrderId";`

class KitchenController {

    async getSentClientOrders(req, res) {
        try {
            const dbRes = await client.query(querySentClientOrders)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new KitchenController();
