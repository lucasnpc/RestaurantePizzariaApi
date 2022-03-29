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
            const values = [req.body.cpf, req.body.name, req.body.street, req.body.number, req.body.district, req.body.city, req.body.phone,
            req.body.role, req.body.admissionDate, req.body.birthDate, req.body.terminationDate, req.body.salary, req.body.isOutsource, req.body.isActive,
            req.body.businessCnpj]
            await client.query(queryPostEmployee, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new EmployeeController();