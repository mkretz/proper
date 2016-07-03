function connectToDatabase() {
    var Sequelize = require('sequelize');
    var promise = require('bluebird');

    var sequelize = new Sequelize('sqlite://:memory:');
    return promise.resolve(sequelize);
}

module.exports = {
    connectToDatabase: connectToDatabase
};