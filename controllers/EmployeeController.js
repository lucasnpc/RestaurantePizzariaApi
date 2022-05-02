const client = require('../database')

const getEmployeesQuery = 'SELECT * FROM public."Employee" WHERE "businessCnpj" = $1 AND "isActive"=true'
const queryPostEmployee = 'INSERT INTO public."Employee"(cpf, name, street, "number", district, city, phone, role, ' +
    '"admissionDate", "birthDate", "terminationDate", salary, "isOutsource", "isActive", "businessCnpj")' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);'
const queryUpdateEmployee = `UPDATE public."Employee" SET cpf=$1, name=$2, street=$3, "number"=$4, district=$5, city=$6, phone=$7, role=$8,
"admissionDate"=$9, "birthDate"=$10, "terminationDate"=$11, salary=$12, "isOutsource"=$13, "isActive"=$14, "businessCnpj"=$15
WHERE cpf=$1;`

class EmployeeController {
    async getEmployees(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getEmployeesQuery, values)
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
    async updateEmployee(req, res) {
        try {
            const values = [req.body.cpf, req.body.name, req.body.street, req.body.number, req.body.district, req.body.city, req.body.phone,
            req.body.role, req.body.admissionDate, req.body.birthDate, req.body.terminationDate, req.body.salary, req.body.isOutsource, req.body.isActive,
            req.body.businessCnpj]
            await client.query(queryUpdateEmployee, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new EmployeeController();