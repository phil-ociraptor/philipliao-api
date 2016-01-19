var mysql = require('mysql');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "philipliao",
    connectionLimit: 10
});

module.exports = pool;