const client = require('../database')

const getItensQuery = 'SELECT * FROM public."MenuItem" WHERE "businessCnpj" = $1;'
const getItensCountQuery = 'SELECT COUNT(*) FROM public."MenuItem" WHERE "businessCnpj" = $1;'
const querySelectLastItem = `SELECT "itemId" FROM public."MenuItem" WHERE "businessCnpj" = $1 ORDER BY "itemId" DESC LIMIT 1;`

const queryInsertItem = `INSERT INTO public."MenuItem"(price, description, "businessCnpj")
	VALUES ($1, $2, $3);`
const queryInsertProductInItem = `INSERT INTO public."MenuItemProducts"("itemId", "productId", "productQuantity")
        VALUES ($1, $2, $3);`

const queryDeleteAllProductsFromItemWithId = `DELETE FROM public."MenuItemProducts"
WHERE "itemId"=$1;`


class MenuItemController {

    async getItens(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getItensQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            });
        } catch (error) { console.log(error); }
    }

    async getItemCount(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getItensCountQuery, values)
            res.send({
                success: true,
                data: dbRes.rows[0].count
            });
        } catch (error) { console.log(error); }
    }

    async postItem(req, res) {
        try {
            const values = [req.body.price, req.body.description, req.body.businessCnpj]
            await client.query(queryInsertItem, values)
            const dbRes = await client.query(querySelectLastItem, [req.body.businessCnpj])
            res.send({
                success: true,
                itemId: dbRes.rows[0].itemId
            });
        } catch (error) { console.log(error); }
    }

    async postMenuItemProduct(req, res) {
        try {
            const values = [req.body.itemId, req.body.productId, req.body.productQuantity]
            await client.query(queryInsertProductInItem, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MenuItemController();