var Project;
function initialize(sequelize) {
    var Sequelize = require('sequelize');
    Project = sequelize.define('project', {
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

    Project.sync({force: true});
}

module.exports = {
    initialize: initialize,
    Project: Project
}
