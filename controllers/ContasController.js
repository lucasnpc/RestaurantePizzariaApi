const client = require('../database')

const getBillsToPayQuery = 'SELECT * FROM "ContasAPagar"'
const getBillsToReceiveQuery = 'SELECT * FROM "ContasAReceber"'
const queryInsertBillToPay = 'INSERT INTO "ContasAPagar"("ehFixa", descricao, "dataPagamento", valor, "tipoServico")' +
    'VALUES ($1, $2, $3, $4, $5);'
const queryInsertBillToReceive = 'INSERT INTO "ContasAReceber"(valor, descricao, "dataRecebimento")' +
    'VALUES ($1, $2, $3);'

class ContasController {
    async getBillsToPay(req, res) {
        try {
            const dbRes = await client.query(getBillsToPayQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getBillsToReceive(req, res) {
        try {
            const dbRes = await client.query(getBillsToReceiveQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postBillToPay(req, res) {
        try {
            const values = [req.body.ehFixa, req.body.descricao, req.body.dataPagamento, req.body.valor,
            req.body.tipoServico]
            const dbRes = await client.query(queryInsertBillToPay, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postBillToReceive(req, res) {
        try {
            const values = [req.body.valor, req.body.descricao, req.body.dataRecebimento]
            const dbRes = await client.query(queryInsertBillToReceive, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ContasController();