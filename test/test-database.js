function connectToDatabase() {
    var Sequelize = require('sequelize');

    // db connection env variables
    var dbUser = process.env.PROPER_DB_USER;
    var dbPwd = process.env.PROPER_DB_PWD;
    var dbHost = process.env.PROPER_DB_HOST;
    var dbPort = process.env.PROPER_DB_PORT;
    var sequelize = new Sequelize('sqlite://:memory:');
    return sequelize;
}

module.exports = {
    connectToDatabase: connectToDatabase
};