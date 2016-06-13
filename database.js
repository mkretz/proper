function connectToDatabase() {
    var Sequelize = require('sequelize');

    // db connection env variables
    var dbUser = process.env.PROPER_DB_USER;
    var dbPwd = process.env.PROPER_DB_PWD;
    var dbHost = process.env.PROPER_DB_HOST;
    var dbPort = process.env.PROPER_DB_PORT;

    var sequelize = new Sequelize('mysql://' + dbUser + ':' + dbPwd + '@' + dbHost +':' + dbPort + '/proper');
    sequelize
        .authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
}

module.exports = {
    connectToDatabase: connectToDatabase
};