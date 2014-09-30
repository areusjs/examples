var glob = require('glob');
// todo pull this out into it's own package for reuse across apps
module.exports = function (resourcesPath, app) {
  var resources = glob.sync(resourcesPath + '/*.js');
  resources.forEach(function (resource) {
    require(resource)(app);
  });
};