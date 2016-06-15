var packageJson = require('../package.json');

function ProjectController(server, Project) {
    var utils = require('../utils')(server);
     return {
         getEntrypoint: function (req, res) {
             var entrypoint = {
                 name : packageJson.name,
                 version : packageJson.version
             };
             utils.addLink(entrypoint,'projects','getprojects',{});
             res.send(entrypoint);
         },
         getProjects: function (req, res) {
            Project.findAll({ limit: 10 })
                .then(function (projects) {
                    utils.addLinks(projects,'self','getproject',{},'projectid');
                    res.send(projects);
                });
         },
         getProject: function (req, res) {
             Project.findById(req.params.projectid).then(function(project) {
                 utils.addLink(project.dataValues,'self','getproject',req.params);
                 res.send(project);
             });
         },
         createProject: function (req, res) {
            Project.create(req.body)
                .then(function (savedProject) {
                    var pathParams = {projectid: savedProject.id};
                    res.header('Location', server.router.render('getproject', pathParams));
                    res.send(204);
                })
         },
         updateProject: function (req, res) {
             Project.update(req.body, {
                 where: {
                     id: req.params.projectid
                 }
                })
                 .then(function (project) {
                     res.send(project);
                 })

         },
         deleteProject: function (req, res) {
             Project.destroy({
                 where: {
                     id: req.params.projectid
                 }
             })
                 .then(function () {
                     res.send(204);
                 });
         }
     }
 }

module.exports = ProjectController;
