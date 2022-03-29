const client = require('../database')

const getEmployeesQuery = 'SELECT * FROM public."Employee"'
const queryPostEmployee = 'INSERT INTO public.public."Employee"(cpf, name, street, "number", district, city, phone, role, ' +
    '"admissionDate", "birthDate", "terminationDate", salary, "isOutsource", "isActive", "businessCnpj")' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);'

class EmployeeController {
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

module.exports = new EmployeeController();