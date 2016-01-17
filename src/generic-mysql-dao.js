var mysql = require("mysql");

class GenericMysqlDao {
    constructor(entityName) {
        this.entityName = entityName;
        this.dbCredentials = {
            host: "localhost",
            user: "root",
            database: "philipliao"
        };
    }
    
    findAll() {
        var queryString = `SELECT * FROM ${this.entityName}`;
        
        var mysqlConnection = mysql.createConnection(this.dbCredentials);
        mysqlConnection.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });
        
        return new Promise(function (resolve, reject) {
            mysqlConnection.query(queryString, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
            mysqlConnection.end();
        });
    }

    findById(id) {
        var queryString = `SELECT * FROM ${this.entityName} WHERE id = ${id}`;
        
        var mysqlConnection = mysql.createConnection(this.dbCredentials);
        mysqlConnection.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });
        
        return new Promise(function (resolve, reject) {
            mysqlConnection.query(queryString, function (err, resp) {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp);
                }
            });
            mysqlConnection.end();
        });
    }
    
    create(newEntity) {
        //TODO(Phil): unimplemented. Think about how to form this query
    }
    
    updateById(id, newEntity) {
        //TODO(Phil): unimplemented. Think about how to form this query
    }
    
    deleteById(id) {
        var queryString = `DELETE FROM ${this.entityName} WHERE id = ${id}`;
        
        var mysqlConnection = mysql.createConnection(this.dbCredentials);
        mysqlConnection.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });
        
        return new Promise(function (resolve, reject) {
            mysqlConnection.query(queryString, function (err, resp) {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp);
                }
            });
            mysqlConnection.end();
        });
    }
}

module.exports = GenericMysqlDao;