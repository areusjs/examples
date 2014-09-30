var nconf = require('nconf');

function ConfigService() {
  // establish configuration hierarchy
  this._config = nconf.argv().env().file({
    file: __dirname + '/../../config.json'
  });
}

ConfigService.prototype.get = function () {
  return this._config
};

// naturally a singleton because node's require caches the value assigned to module.exports
module.exports = new ConfigService();