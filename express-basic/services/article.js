var services = require('./'),
  config = services.config,
  articles = services.db.collection('articles'),
  cache = services.cache.get('articles', {maxAge: 1000}),
  logger = services.logger.get('services:article');

exports.getAll = function (cb) {
  logger.info('configured answer: ',
    config.get('answer'));

  if (cache.has('articles')) {
    return process.nextTick(function () {
      logger.info('from cache');
      cb(null, cache.get('articles'));
    });
  }

  articles.find().toArray(function (err, articles) {
    if (err) return cb(err);
    cache.set('articles', articles);
    logger.info('from db');
    cb(null, articles);
  });
};
