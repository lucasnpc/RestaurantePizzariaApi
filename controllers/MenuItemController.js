const client = require('../database')

const getItensQuery = 'SELECT * FROM public."MenuItem" WHERE "businessCnpj" = $1;'

const getItensCountQuery = 'SELECT COUNT(*) FROM public."MenuItem" WHERE "businessCnpj" = $1;'

const queryInsertItem = 'INSERT INTO public."MenuItem"("productListNQuantity", price, description, "businessCnpj")' +
    ' VALUES ($1, $2, $3, $4)'


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
            console.log(dbRes);
            res.send({
                success: true,
                data: dbRes.rows[0].count
            });
        } catch (error) { console.log(error); }
    }

    async postItem(req, res) {
        try {
            const values = [req.body.productListNQuantity, req.body.price, req.body.description, req.body.businessCnpj]
            await client.query(queryInsertItem, values)
            res.send({
                success: true
            });
        } catch (error) { console.log(error); }
    }
}

module.exports = new MenuItemController();