const client = require('../database')

const getItensQuery = {
    name: 'get-itens',
    text: 'SELECT * FROM "ItensCardapio"'
}
const getItensCountQuery = {
    name: 'get-item-count',
    text: 'SELECT COUNT(*) FROM "ItensCardapio"'
}
const queryInsertItem = {
    name: 'insert-item',
    text: 'INSERT INTO "ItensCardapio"("idItem", preco, descricao) VALUES ($1, $2, $3)'
}

class CardapioController {

    async getItens(req, res) {
        try {
            const dbRes = await client.query(getItensQuery)
            res.send({
                success: true,
                data: dbRes.rows
            });
        } catch (error) { console.log(error); }
    }

    async getItemCount(req, res) {
        try {
            const dbRes = await client.query(getItensCountQuery)
            console.log(dbRes);
            res.send({
                success: true,
                data: dbRes.rows[0].count
            });
        } catch (error) { console.log(error); }
    }

    async postItem(req, res){
        try {
            const values = [req.body.idItem, req.body.preco, req.body.descricao]
            const dbRes = await client.query(queryInsertItem, values)
            res.send({
                success: true,
                data: dbRes.rows
            });
        } catch (error) { console.log(error); }
    }
}

module.exports = new CardapioController();