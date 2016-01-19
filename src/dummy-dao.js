var GenericMysqlDao = require('./generic-mysql-dao.js');

class DummyDao extends GenericMysqlDao {
    constructor(pool) {
        super('Dummy', ['id', 'name', 'created'], pool);
    }
}

module.exports = DummyDao;