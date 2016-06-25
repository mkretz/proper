function connectToDatabase() {
    var Sequelize = require('sequelize');

    var sequelize = new Sequelize('sqlite://:memory:');
    return sequelize;
}

module.exports = {
    connectToDatabase: connectToDatabase
};