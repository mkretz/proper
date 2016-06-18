projectPaths = require('../project/project-paths');
var environments = projectPaths.project + '/environment';
var environment = environments + '/:environmentid';

module.exports = {
    environments: environments,
    environment: environment
}
