const client = require('../database')

const getOrdersQuery = 'SELECT * FROM "Entradas"'
const getExpensesQuery = 'SELECT * FROM "Saidas"'
const queryInsertInflow = 'INSERT INTO "Entradas"("numeroMesa", "itensCardapio", "valorConta", "formaPagamento")' +
    ' VALUES ($1, $2, $3, $4);'
const queryInsertExpense = 'INSERT INTO "Saidas"(descricao, valor) VALUES ($1, $2);'
const queryGetTopMenuItems = 'SELECT unnest("itensCardapio") as "name", COUNT("itensCardapio"::text) as "value"' +
    ' FROM public."Entradas" GROUP BY "name" ORDER BY "value" DESC LIMIT 3;'
const queryGetTopSalesDesks = 'SELECT "numeroMesa" as "name", COUNT("numeroMesa") as "value"' +
    'FROM public."Entradas" GROUP BY "name" ORDER BY "value" DESC LIMIT 3;'

class CaixaControler {

    async getInflows(req, res) {
        try {
            const dbRes = await client.query(getOrdersQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getExpenses(req, res) {
        try {
            const dbRes = await client.query(getExpensesQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getTopMenuItems(req, res) {
        try {
            const dbRes = await client.query(queryGetTopMenuItems)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getTopSalesDesks(req, res) {
        try {
            const dbRes = await client.query(queryGetTopSalesDesks)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postInflow(req, res) {
        try {
            const values = [req.body.numeroMesa, req.body.itensCardapio, req.body.valorConta, req.body.formaPagamento];
            const dbRes = await client.query(queryInsertInflow, values)
            res.send({
                success: true
            });
        } catch (error) {
            console.log(error);
        }
    }
    async postExpense(req, res) {
        try {
            const values = [req.body.descricao, req.body.valor]
            const dbRes = await client.query(queryInsertExpense, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CaixaControler();