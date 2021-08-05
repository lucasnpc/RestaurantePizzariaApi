const client = require('../database')

const getEmployeesQuery = 'SELECT * FROM "Funcionarios"'

class FuncionariosController {
    async getFuncionarios(req, res) {
        try {
            const dbRes = await client.query(getEmployeesQuery)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new FuncionariosController();