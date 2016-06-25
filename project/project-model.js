module.exports = function (sequelize, Environment, Version) {
    var Sequelize = require('sequelize');
    var Project = sequelize.define('project', {
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
    Project.hasMany(Environment);
    Environment.belongsTo(Project);
    Project.hasMany(Version);
    Version.belongsTo(Project);
    return Project;
};
