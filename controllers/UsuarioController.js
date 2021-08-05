const client = require('../database')

const getUsersQuery = 'SELECT * FROM "Usuario"'
const authUserQuery = 'SELECT * FROM "Usuario" WHERE "usuarioId" = $1 and senha = $2;'

class UsuarioController {
    async getUsuarios(req, res) {
        try {
            const dbRes = await client.query(getUsersQuery)
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
            const values = [req.body.userId, req.body.userSenha]
            const dbRes = await client.query(authUserQuery, values)
            if (dbRes.rows == 0)
                res.status(500).json({ message: 'User or pass Incorrect' })
            res.send({
                success: true,
                data: dbRes
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UsuarioController();