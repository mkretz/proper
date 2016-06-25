var packageJson = require('../package.json');
var _ = require('lodash');
var slug = require('slug');

function ProjectController(server, Project) {
    var utils = require('../utils')(server);
    
    function addProjectLinks(project, reqParams) {
        utils.addLink(project, 'self', 'getproject', reqParams);
        utils.addLink(project, 'environments', 'getenvironments', reqParams);
        utils.addLink(project, 'versions', 'getversions', reqParams);
    }

    function loadProject(req) {
        return Project.findById(req.params.projectid).then(function (project) {
            if (!_.isNull(project)) {
                addProjectLinks(project.dataValues,req.params);
                return project;
            }
            else {
                return Promise.reject();
            }
        });
    }

     return {

         addProject: function (req, res, next) {
             loadProject(req)
                .then(function (project) {
                        utils.addRequestData(req, 'project', project);
                        next();
                    },
                    function () {
                        res.send(404);
                    })
         },
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
                    utils.addLinks(projects, addProjectLinks, {}, 'projectid');
                    res.send(projects);
                });
         },
         getProject: function (req, res) {
             loadProject(req)
                 .then(function (project) {
                     res.send(project);
                 },
                 function () {
                     res.send(404);
                 });
         },
         createProject: function (req, res) {
             if (req.body.name) {
                 req.body.name = slug(req.body.name);
                 Project.create(req.body)
                     .then(function (savedProject) {
                         var pathParams = {projectid: savedProject.id};
                         res.header('Location', server.router.render('getproject', pathParams));
                         res.send(204);
                     })
             }
             else {
                 res.send(400);
             }
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
