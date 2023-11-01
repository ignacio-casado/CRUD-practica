const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'istea',
    database: 'dbNode'
});

module.exports = connection;