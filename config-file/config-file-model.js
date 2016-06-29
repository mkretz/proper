module.exports = function (sequelize) {
    var Sequelize = require('sequelize');
    var ConfigFile = sequelize.define('configfile', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'path-name'

        },
        path: {
            type: Sequelize.STRING,
            unique: 'path-name'
        },
        version: {
            type: Sequelize.INTEGER
        },
        data: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    return ConfigFile;
};
