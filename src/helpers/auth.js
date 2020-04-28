const crypto = require('crypto')

module.exports = {
    generateSalt: (length) => {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    },
    setEmail: (email, salt) => {
        const hash = crypto.createHmac('sha512', salt)
        hash.update(email)
        const value = hash.digest('hex')
        return {
            email: value,
            salt: salt
        }
    },
    setPassword: (password, salt) => {
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const value = hash.digest('hex')
        return {
            password: value,
            salt: salt
        }
    }
}