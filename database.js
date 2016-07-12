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
            var createUserSql = 'create user \'' + dbUser + '\' identified by \'' + dbPwd +'\'';
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

    var dbRootPwdDefault = 'proper-root';
    var dbPwdDefault = 'proper';
    
    var Sequelize = require('sequelize');

    // db creation env variables, defaults for dev environment
    var dbName = process.env.PROPER_DB_NAME || 'proper';
    var dbRootPwd = process.env.PROPER_DB_ROOT_PWD || dbRootPwdDefault;

    // db connection env variables, defaults for dev environment
    var dbUser = process.env.PROPER_DB_USER || 'properuser';
    var dbPwd = process.env.PROPER_DB_PWD || dbPwdDefault;
    var dbHost = process.env.PROPER_DB_HOST || '127.0.0.1';
    var dbPort = process.env.PROPER_DB_PORT || '3307';

    if (dbRootPwd === dbRootPwdDefault || dbPwd === dbPwdDefault) {
        console.log('****************************************************************');
        console.log('Using default database credentials. Not safe for production use!');
        console.log('****************************************************************');
    }

    return createDatabaseIfNeeded(dbHost, dbPort, dbRootPwd, dbName, dbUser, dbPwd)
        .then(function () {
            var sequelize = new Sequelize('mysql://' + dbUser + ':' + dbPwd + '@' + dbHost +':' + dbPort + '/' + dbName);
            return sequelize;
        });
}

module.exports = {
    connectToDatabase: connectToDatabase
};