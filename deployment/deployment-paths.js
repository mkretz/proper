var envPaths = require('../environment/environment-paths');
var deployments = envPaths.environment + '/deployment';
var deployment = deployments + '/:deploymentid';

module.exports = {
    deployments: deployments,
    deployment: deployment
};