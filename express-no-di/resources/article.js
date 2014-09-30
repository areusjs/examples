var express = require('express'),
  router = express.Router(),
  articleService = require('../services/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  function respond(err, articles) {
    if (err) return next(err);
    res.json(articles);
  }

  articleService.getAll(respond);
});