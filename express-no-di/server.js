var express = require('express'),
  path = require('path'),
  app = express(),
  appUse = require('./services/core/app-use'),
  config = require('./services/core/config').get();

// dynamically loads all routes
appUse(path.join(__dirname, 'resources'), app);

app.listen(config.get('PORT'));
