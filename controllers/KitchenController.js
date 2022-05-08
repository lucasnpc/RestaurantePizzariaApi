const client = require('../database')

const querySentClientOrders = `SELECT "deskDescription", "ClientOrdersItems"."clientOrderId", "orderStatus" FROM public."Orders" INNER JOIN "ClientOrders" 
ON "ClientOrders"."orderId" = "Orders"."orderId" INNER JOIN "ClientOrdersItems" ON "ClientOrders"."clientOrderId" = "ClientOrdersItems"."clientOrderId"
WHERE "orderStatus"='enviado' OR "orderStatus"='preparando' GROUP BY "deskDescription", "ClientOrdersItems"."clientOrderId","orderStatus" ;`

const queryUpdateOrderStatus = `UPDATE public."ClientOrdersItems" SET "orderStatus"=$1 WHERE "clientOrderId"=$2;`

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

    async updateOrderStatus(req, res) {
        try {
            const values = [req.body.status, req.body.id]
            await client.query(queryUpdateOrderStatus, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new KitchenController();
