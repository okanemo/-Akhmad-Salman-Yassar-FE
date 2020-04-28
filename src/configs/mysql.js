require('dotenv').config()

module.exports = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    api: process.env.API,
    port: process.env.PORT,
    web: process.env.WEB,
    JWT_KEY: process.env.JWT_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}