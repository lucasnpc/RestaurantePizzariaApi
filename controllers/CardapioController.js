const { response } = require('express');
const client = require('../database')

const getQuery = {
    name: 'get-itens',
    text: 'SELECT * FROM "ItensCardapio"'
}
const getCountQuery = {
    name: 'get-item-count',
    text: 'SELECT COUNT(*) FROM "ItensCardapio"'
}
const queryInsert = {
    name: 'insert-item',
    text: 'INSERT INTO "ItensCardapio"("idItem", preco, descricao) VALUES ($1, $2, $3)'
}

class CardapioController {

    async getItens(req, res) {
        try {
            const dbRes = await client.query(getQuery)
            console.log(dbRes);
            res.send({
                success: true,
                data: dbRes.rows
            });
        } catch (error) { console.log(error); }
    }

    async getItemCount(req, res) {
        try {
            const dbRes = await client.query(getCountQuery)
            console.log(dbRes);
            res.send({
                success: true,
                data: dbRes.rows[0].count
            });
        } catch (error) { console.log(error); }
    }

    async postItem(req, res){
        try {
            const values = [req.body.id, req.body.preco, req.body.descricao]
            const dbRes = await client.query(queryInsert, values)
            console.log(dbRes);
            res.send({
                success: true,
                data: dbRes.rows
            });
        } catch (error) { console.log(error); }
    }
}

module.exports = new CardapioController();