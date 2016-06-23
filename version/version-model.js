module.exports = function (sequelize) {
    var Sequelize = require('sequelize');
    var Version = sequelize.define('version', {
        number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        description: {
            type: Sequelize.STRING
        },
        version: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
    return Version;
};
