var GenericMysqlDao = require('./generic-mysql-dao.js');

class DummyDao extends GenericMysqlDao {
    constructor() {
        super('Dummy');
    }
}

module.exports = DummyDao;