var express = require('express'),
  glob = require('glob'),
  path = require('path'),
  app = express(),
  config = require('./services/core/config').get();

// dynamically load all routes
var resourcesPath = path.join(__dirname, 'resources');
var resources = glob.sync(resourcesPath + '/*.js');
resources.forEach(function (resource) {
  require(resource)(app);
});

app.listen(config.get('PORT'));
