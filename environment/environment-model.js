module.exports = function (sequelize) {
    var Sequelize = require('sequelize');
    var Environment = sequelize.define('environment', {
        name: {
            type: Sequelize.STRING
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
