var express = require('express'),
  services = require('./services'),
  logger = services.logger.get('server'),
  port = services.config.get('PORT'),
  app = express();

// attach top-level routes here
app.use('/*', require('./resources/articles'));

app.listen(port, function () {
  logger.info('listening on http://localhost:%s', port);
});
