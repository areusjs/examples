module.exports = Article;

function Article(config, db, cache, logger) {
  this._config = config;
  this._articles = db.collection('articles');
  this._cache = cache.get('articles', {maxAge: 1000});
  this._logger = logger.get('services:article');
}

Article.$inject = [
  'config',
  'db',
  'cache',
  'logger'
];

Article.prototype.getAll = function (cb) {
  var self = this;

  this._logger.info('configured answer: ',
    this._config.get('answer'));

  if (this._cache.has('articles')) {
    return process.nextTick(function () {
      self._logger.info('from cache');
      cb(null, self._cache.get('articles'));
    });
  }

  this._articles.find().toArray(function (err, articles) {
    if (err) return cb(err);
    self._cache.set('articles', articles);
    self._logger.info('from db');
    cb(null, articles);
  });
};
