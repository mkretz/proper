function createDatabaseIfNeeded(dbHost, dbPort, dbRootPwd, dbName, dbUser, dbPwd) {
    var mysql = require('mysql');
    var promise = require('bluebird');
    var connection = mysql.createConnection({
        host     : dbHost,
        user     : 'root',
        port     : dbPort,
        password : dbRootPwd
    });

    connection.connect();
    var promiseQuery = promise.promisify(connection.query, {context: connection});
    return promiseQuery('create DATABASE ' + dbName)
        .then(function () {
            var createUserSql = 'create user ' + dbUser + ' identified by ' + dbPwd;
            return promiseQuery(createUserSql);
        })
        .then(function () {
            var createUserSql = 'create user ' + dbUser + ' identified by ' + dbPwd;
            return promiseQuery(createUserSql);
        })
        .then(function () {
            var grantSql = 'grant all on ' + dbName + '.* to ' + dbUser;
            return promiseQuery(grantSql);
        })
        .catch(function (err) {

        })
        .finally(function () {
            connection.end();
        });

}

function connectToDatabase() {
    var Sequelize = require('sequelize');

    // db creation env variables
    var dbName = process.env.PROPER_DB_NAME || 'proper';
    var dbRootPwd = process.env.PROPER_DB_ROOT_PWD || 'proper-root';

    // db connection env variables
    var dbUser = process.env.PROPER_DB_USER;
    var dbPwd = process.env.PROPER_DB_PWD;
    var dbHost = process.env.PROPER_DB_HOST;
    var dbPort = process.env.PROPER_DB_PORT;

    return createDatabaseIfNeeded(dbHost, dbPort, dbRootPwd, dbName, dbUser, dbPwd)
        .then(function () {
            var sequelize = new Sequelize('mysql://' + dbUser + ':' + dbPwd + '@' + dbHost +':' + dbPort + '/proper');
            return sequelize;
        });
}

module.exports = {
    connectToDatabase: connectToDatabase
};