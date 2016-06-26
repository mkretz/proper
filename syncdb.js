function syncModels(Environment, Version, Project, Deployment) {
    return Project.sync()
        .then(function () {
           return Environment.sync();
        })
        .then(function () {
            return Version.sync();
        })
        .then(function () {
            return Deployment.sync();
        });
}

module.exports = {
    syncModels: syncModels
};
