const client = require('../database')

const getOrdersQuery = 'SELECT * FROM "Entradas"'
const getExpensesQuery = 'SELECT * FROM "Saidas"'
const queryInsertInflow = 'INSERT INTO "Entradas"("idEntrada", "numeroMesa", "itensCardapio", "valorConta", "formaPagamento")' +
    ' VALUES ($1, $2, $3, $4, $5);'
const queryInsertExpense = 'INSERT INTO "Saidas"("idSaida", descricao, valor) VALUES ($1, $2, $3);'

class CaixaControler {

    async getEntradas(req, res) {
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
    async getSaidas(req, res) {
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
    async postInflow(req, res) {
        try {
            const values = [req.body.idEntrada, req.body.numeroMesa, req.body.itensCardapio, req.body.valorConta, req.body.formaPagamento];
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
            const values = [req.body.idSaida, req.body.descricao, req.body.valor]
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