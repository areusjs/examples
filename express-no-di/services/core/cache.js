var LRU = require('lru-cache'),
  LRUPool = require('lru-cache-pool');

module.exports = new CacheService();

function CacheService() {
  this._cache = LRUPool(LRU);
}

CacheService.prototype.get = function () {
  return this._cache;
};