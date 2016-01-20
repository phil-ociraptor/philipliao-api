var mysql = require("mysql");
var mysqlQueryUtils = require("./mysql-query-utils.js");

/** Class abstracting away the a MySQL table */
class GenericMysqlDao {
    
    /**
     * @desc Creates a DAO (Data Access Object) for a given entity
     * 
     * @param {string} entityName - the name of the table which represents the entity
     * @param {[string]} fields - the array of field names for the table, order does not matter
     * @param {mysql-connection-pool} pool - a pool of mysql connections. See https://github.com/felixge/node-mysql
     */
    constructor(entityName, fields, pool) {
        this.entityName = entityName;
        this.fields = fields;
        this.pool = pool;
    }
    
    /**
     * @desc Given a query, this method executs it via the connection pool
     * 
     * @param {string} query - the mysql query to execute
     * @return {Promise} - a promise resolved with the rows (an array) or rejected with the connection error
     */
    executeQuery(query) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.pool.getConnection(function (err, connection) {
                connection.query(query, function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            });
        });
    }
    
    /**
     * @desc Finds all rows in the table
     * 
     * @return {Promise} - a promise resolved with the rows (an array) or rejected with the connection error
     */
    findAll() {
        var queryString = `SELECT * FROM ${this.entityName}`;
        return this.executeQuery(queryString); 
    }

    /**
     * @desc Finds a row in the table. Promise is resolved with an array (will need to get the first elem)
     * 
     * @param {number} id - the id of the entity
     * @return {Promise} - a promise resolved with the row (in an array) or rejected with the connection error
     */
    findById(id) {
        var queryString = `SELECT * FROM ${this.entityName} WHERE id = ${id}`;
        return this.executeQuery(queryString);
    }
    
    /**
     * @desc Creates a new entry in the table
     * 
     * @param {object} entity - the new row to create
     * @return {Promise} - a promise resolved with the result (as an array) or rejected with the connection error
     */
    create(entity) {
        var fieldsString = mysqlQueryUtils.prepareFields(this.fields, entity),
            valuesString = mysqlQueryUtils.prepareValues(this.fields, entity);
            
        var queryString = `INSERT INTO ${this.entityName} (${fieldsString}) VALUES (${valuesString})`;
        return this.executeQuery(queryString);
    }
    
    /**
     * @desc Updates a row in the table
     * 
     * @param {number} id - the id of the row to update
     * @param {object} entity - the new values with which to overwrite 
     * @return {Promise} - a promise resolved with the result (as an array) or rejected with the connection error
     */
    updateById(id, entity) {        
        var fieldsToUpdate = mysqlQueryUtils.prepareFieldsToValues(this.fields, entity);
        
        var queryString = `UPDATE ${this.entityName} SET ${fieldsToUpdate} WHERE id=${id};`;
        return this.executeQuery(queryString);
    }
    
    /**
     * @desc Deletes a row in the table
     * 
     * @param {number} id - the id of the row to delete
     * @return {Promise} - a promise resolved with the result (as an array) or rejected with the connection error
     */
    deleteById(id) {
        var queryString = `DELETE FROM ${this.entityName} WHERE id = ${id}`;
        return this.executeQuery(queryString);
    }
}

module.exports = GenericMysqlDao;