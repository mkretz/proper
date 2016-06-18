module.exports = function (server) {
    var _ = require('lodash');

    function addLink(data, rel, routeName, reqParams) {
        if (!data._links) {
            data._links = [];
        }
        data._links.push({rel: rel, href: server.router.render(routeName, reqParams)});
    }

    function addLinks (dataArray, rel, routeName, reqParams, idParamName) {
        _.forEach(dataArray, function (dataObject) {
            var dataValues = dataObject.dataValues;
            reqParams[idParamName] = dataValues.id;
            addLink(dataValues, rel, routeName, reqParams);
        })
    }

    function addRequestData(req, name, value) {
        if (!req.proper) {
            req.proper = {};
        }
        req.proper[name] = value;
    }

    function getRequestData(req, name) {
        return (req.proper ? req.proper[name] : undefined);
    }

    return {

        addLink: addLink,
        addLinks: addLinks,
        addRequestData: addRequestData,
        getRequestData: getRequestData

    };
};