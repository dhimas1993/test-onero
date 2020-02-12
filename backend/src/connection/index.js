const mysql = require('mysql')

const conn = mysql.createConnection(
    {
        user: 'final project',
        password: 'Mysql123',
        host: 'localhost',
        database: 'final_project',
        port : 3306
    }
)

module.exports = conn
