module.exports = function (sequelize, Environment, Version) {
    var Sequelize = require('sequelize');
    var Deployment = sequelize.define('deployment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: Sequelize.STRING
        },
        version: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });

    Environment.belongsToMany(Version, { through: Deployment });
    Version.belongsToMany(Environment, { through: Deployment });
    return Deployment;
};