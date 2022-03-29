const client = require('../database')

const getExpensesQuery = 'SELECT * FROM public."Expenses"'
const queryInsertExpense = 'INSERT INTO public."Expenses"(description, value, "expenseDate", "businessCnpj") ' +
    'VALUES ($1, $2, $3, $4);'

class ExpensesController {

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
    async postExpense(req, res) {
        try {
            const values = [req.body.description, req.body.value, req.body.expenseDate, req.body.businessCnpj]
            await client.query(queryInsertExpense, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ExpensesController();