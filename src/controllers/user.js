const model = require('../models/user')
const response = require('../helpers/response')
const auth = require('../helpers/auth')
const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../configs/mysql')

module.exports = {
    login: async (req, res) => {
        try {
            const check = await model.checkEmail(req.body.email)
            const dataUser = check[0]

            if (dataUser === undefined) {
                return response.error(res, 404, 'Your email is not registerd!')
            } else {
                const email = req.body.email
                const password = req.body.password
                const hash_password = auth.setPassword(password, dataUser.salt)

                if (dataUser.email !== email) {
                    return response.error(res, 404, 'Email is incorrect!')
                }
                if (dataUser.password !== hash_password.password) {
                    return response.error(res, 404, 'Password is incorrect!')
                }

                const token = JWT.sign({
                    id: dataUser.id,
                    email: dataUser.email
                }, JWT_KEY, {
                    expiresIn: '24h'
                })

                const id = dataUser.id
                const last_login = new Date()
                await model.checkLastLogin(last_login, id)

                delete dataUser.name
                delete dataUser.email
                delete dataUser.password
                delete dataUser.salt
                delete dataUser.last_login
                delete dataUser.date_added
                delete dataUser.date_updated

                dataUser.token = token
                const result = []
                result.push(dataUser)

                response.success(res, 200, result)
            }
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    createUser: async (req, res) => {
        try {
            const check = await model.checkEmail(req.body.email)
            const dataUser = check[0]
            const salt = auth.generateSalt(18)
            const hash_password = auth.setPassword(req.body.password, salt)

            if (dataUser === undefined) {
                const name = req.body.name
                const email = req.body.email
                const id_role = req.body.id_role
                const data = {
                    name,
                    email,
                    password: hash_password.password,
                    salt: hash_password.salt,
                    id_role,
                    date_added: new Date(),
                    date_updated: new Date()
                }

                const result = await model.createUser(data)
                response.success(res, 200, result)
            } else {
                return response.error(res, 404, 'Your email is already registerd!')
            }
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    readUser: async (req, res) => {
        try {
            const result = await model.readUser()
            response.success(res, 200, result)
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id
            const name = req.body.name
            const email = req.body.email
            const id_role = req.body.id_role
            const data = {
                name,
                email,
                id_role,
                date_updated: new Date()
            }

            const result = await model.updateUser(data, id)
            response.success(res, 200, result)
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id

            const result = await model.deleteUser(id)
            response.success(res, 200, result)
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    detailUser: async (req, res) => {
        try {
            const id = req.params.id

            const result = await model.detailUser(id)
            response.success(res, 200, result)
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
    changePassword: async (req, res) => {
        try {
            const id = req.params.id
            const check = await model.checkId(id)
            const dataUser = check[0]
            const salt = auth.generateSalt(18)
            const hash_current_password = auth.setPassword(req.body.current_password, dataUser.salt)
            const hash_new_password = auth.setPassword(req.body.new_password, salt)
            const hash_confirm_new_password = auth.setPassword(req.body.confirm_new_password, salt)
            if (dataUser.password !== hash_current_password.password) {
                return response.error(res, 404, 'Current password is wrong!')
            } else {
                if (hash_new_password.password !== hash_confirm_new_password.password) {
                    return response.error(res, 404, 'The new password and confirmation do not match!')
                } else {
                    const data = {
                        password: hash_new_password.password,
                        salt: hash_new_password.salt,
                        date_updated: new Date()
                    }

                    await model.changePassword(data, id)
                    response.success(res, 200, 'Your password has been changed!')
                }
            }
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    },
}