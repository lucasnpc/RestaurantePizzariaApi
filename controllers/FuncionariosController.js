const client = require('../database')

const getEmployeesQuery = 'SELECT * FROM "Funcionarios"'
const queryPostEmployee = 'INSERT INTO public."Funcionarios"(cpf, nome, rua, numero, bairro, cidade, telefone, cargo,' +
    '"dataAdmissao", "dataNascimento", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);'

class FuncionariosController {
    async getEmployees(req, res) {
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
    async postEmployee(req, res) {
        try {
            const values = [req.body.cpf, req.body.nome, req.body.rua, req.body.numero, req.body.bairro, req.body.cidade, req.body.telefone,
            req.body.cargo, req.body.dataAdmissao, req.body.dataNascimento, req.body.status]
            const dbRes = await client.query(queryPostEmployee, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new FuncionariosController();