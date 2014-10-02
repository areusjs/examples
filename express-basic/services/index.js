var nconf = require('nconf'),
  mongo = require('mongoskin'),
  LRU = require('lru-cache'),
  LRUPool = require('lru-cache-pool'),
  bunyan = require('bunyan');

// establish configuration hierarchy
nconf.argv().env().file({
  file: __dirname + '/../config.json'
});

// define common services
module.exports = {
  config: nconf,
  db: mongo.db(nconf.get('mongo:uri')),
  cache: LRUPool(LRU),
  logger: {
    get: function (name) {
      return bunyan.createLogger({
        name: name,
        level: nconf.get('logger:level')
      });
    }
  }
};
