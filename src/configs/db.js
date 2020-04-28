const { database } = require('./mysql')
const mysql = require('mysql')

const db = mysql.createConnection(database)

db.connect((err) => {
    if (err) {
        console.log(`DATABASE CONNECTION FAILED: ${database.database}`)
    } else {
        console.log(`DATABASE CONNECTION SUCCESSFUL: ${database.database}`)
    }
})

module.exports = db