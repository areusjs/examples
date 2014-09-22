module.exports = Articles;

function Articles(articleService) {
  this._articleService = articleService;
}

Articles.$inject = [
  '../services/article'
];

Articles.prototype.route = function (router) {
  router.get('/', this.getAll.bind(this));
};

Articles.prototype.getAll = function (req, res, next) {
  function respond(err, articles) {
    if (err) return next(err);
    res.json(articles);
  }
  this._articleService.getAll(respond);
};
