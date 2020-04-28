const db = require('../configs/db')

module.exports = {
    createUser: (data) => {
        return new Promise((resolve, reject) => {
            db.query('ALTER TABLE user AUTO_INCREMENT = 0')
            db.query('INSERT INTO user SET ?', data)
            db.query('SELECT user.*, role.name AS role FROM user INNER JOIN role ON role.id = user.id_role', (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    readUser: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT user.*, role.name AS role FROM user INNER JOIN role ON role.id = user.id_role', (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    updateUser: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET ? WHERE id = ?', [data, id])
            db.query('SELECT user.*, role.name AS role FROM user INNER JOIN role ON role.id = user.id_role', (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE id = ?', id)
            db.query('SELECT user.*, role.name AS role FROM user INNER JOIN role ON role.id = user.id_role', (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    detailUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT user.*, role.name AS role FROM user INNER JOIN role ON role.id = user.id_role WHERE user.id = ?', id, (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    checkId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id = ?', id, (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    checkPassword: (password) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE password = ?', password, (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    checkLastLogin: (last_login, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET last_login = ? WHERE id = ?', [last_login, id], (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    },
    changePassword: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) reject(new Error(err))
                resolve(result)
            })
        })
    }
}