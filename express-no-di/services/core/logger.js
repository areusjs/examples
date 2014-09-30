var bunyan = require('bunyan'),
  config = require('./config').get();

module.exports = new LoggerService();

function LoggerService() {
}

LoggerService.prototype.get = function (name) {
  return bunyan.createLogger({
    name: name,
    level: config.get('logger:level')
  });
};