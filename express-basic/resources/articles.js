var router = require('express').Router(),
  article = require('../services/article'),
  router;

module.exports = router;

router.get('/', function (req, res, next) {
  function respond(err, articles) {
    if (err) return next(err);
    res.json(articles);
  }
  article.getAll(respond);
});
