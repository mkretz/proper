function EnvironmentController(server, ProjectController, Environment) {
    var utils = require('../utils')(server);

    return {
        getProject: function (req, res, next) {
            ProjectController.loadProject(req)
                .then(function (project) {
                        utils.addRequestData(req, 'project', project);
                        next();
                    },
                    function () {
                        res.send(404);
                    })
        },
        getEnvironments: function (req, res) {
            utils.getRequestData(req, 'project').getEnvironments()
                .then(function (environments) {
                    res.send(environments);
                })
        },
        getEnvironment: function (req, res) {

        },
        createEnvironment: function (req, res) {

        },
        updateEnvironment: function (req, res) {

        },
        deleteEnvironment: function (req, res) {

        }
    }

}

module.exports = EnvironmentController;