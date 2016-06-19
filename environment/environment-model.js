module.exports = function (sequelize) {
    var Sequelize = require('sequelize');
    var Environment = sequelize.define('environment', {
        name: {
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
    return Environment;
};
