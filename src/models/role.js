const db = require('../configs/db')

module.exports = {
    readRole: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM role', (err, result) => {
                if (err) reject(new Error(Err))
                resolve(result)
            })
        })
    }
}