const client = require('../database')

const getUsersQuery = 'SELECT * FROM "Usuario" WHERE "businessCnpj" = $1;'
const authUserQuery = 'SELECT * FROM public."User" WHERE "email" = $1 and password = $2;'
const queryInsertUser = 'INSERT INTO "User"("email", "password", "userType", "businessCnpj")' +
    'VALUES ($1, $2, $3, $4);'

class UserController {
    async getUsuarios(req, res) {
        try {
            const values = [req.query.businessCnpj]
            const dbRes = await client.query(getUsersQuery, values)
            res.send({
                success: true,
                data: dbRes.rows
            })
        } catch (error) {
            console.log(error);
        }
    }
    async authUsuario(req, res) {
        try {
            const values = [req.body.email, req.body.password]
            const dbRes = await client.query(authUserQuery, values)
            if (dbRes.rows == 0)
                res.status(500).json({ message: 'User or pass Incorrect' })
            res.send({
                success: true,
                data: dbRes.rows[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
    async postUser(req, res) {
        try {
            const values = [req.body.email, req.body.password, req.body.userType, req.body.businessCnpj]
            await client.query(queryInsertUser, values)
            res.send({
                success: true
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

module.exports = new UserController();