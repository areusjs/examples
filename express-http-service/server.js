var express = require('express'),
  nconf = require('nconf'),
  mongo = require('mongoskin'),
  LRU = require('lru-cache'),
  LRUPool = require('lru-cache-pool'),
  bunyan = require('bunyan'),
  DI = require('areus-di'),
  Resource = require('areus-http-resource'),
  app = express(),
  di = DI(__dirname),
  resource = Resource(di, express.Router);

// establish configuration hierarchy
nconf.argv().env().file({
  file: __dirname + '/config.json'
});

// define common services
di.provide({
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
});

// attach top-level routes
app.use('/', resource('articles'));

app.listen(nconf.get('PORT'));
