const JWT = require('jsonwebtoken')
const { JWT_KEY } = require('../configs/mysql')
const response = require('../helpers/response')

const checkAuth = (req, res, next) => {
    const id = req.headers.id
    const token = req.headers.token

    if (token === undefined) {
        return response.error(res, 404, 'Please Provide Token!')
    } else if (token !== undefined) {
        JWT.verify(token, JWT_KEY, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                return response.error(res, 404, 'Token Expired!')
            } else if (err && err.name === 'JsonWebTokenError') {
                return response.error(res, 404, 'Token Error!')
            } else if (err && err.name === 'SyntaxError') {
                return response.error(res, 404, 'Token Wrong!')
            } else if (parseInt(id) !== parseInt(decoded.id)) {
                return response.error(res, 404, 'You\'re Unauthorized!')
            }
            next()
        })
    }
}

module.exports = {
    middleware: checkAuth
}