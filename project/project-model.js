module.exports = function (sequelize) {
    var Sequelize = require('sequelize');
    var Project = sequelize.define('project', {
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
    Project.sync();
    return Project;
};
