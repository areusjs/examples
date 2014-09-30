var mongo = require('mongoskin'),
  config = require('./config').get();

module.exports = new DbService();

function DbService() {
  this._db = mongo.db(config.get('mongo:uri'));
}

DbService.prototype.get = function () {
  return this._db;
};
