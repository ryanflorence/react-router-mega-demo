var Promise = require('when').Promise;
var axios = require('axios');
var HOST = 'http://addressbook-api.herokuapp.com';
var cache = require('./cache');

exports.get = (url, cacheKey) => {
  var cached = cache.get(cacheKey || url);
  return (cached) ?
    Promise.resolve(cached) :
    axios.get(HOST+url).then(function(res) {
      cache.set(cacheKey || url, res.data);
      return res.data;
    });
};

exports.post = (url, data) => {
  return axios.post(HOST+url, data).then(function(res) {
    return res.data;
  });
};

