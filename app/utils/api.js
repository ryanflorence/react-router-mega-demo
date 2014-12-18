var Promise = require('when').Promise;
var axios = require('axios');
var HOST = 'http://addressbook-api.herokuapp.com';
var cache = require('./cache');
var events = require('events').EventEmitter;

exports.get = (url, token) => {
  var cached = cache.get(token, url);
  return (cached) ?
    Promise.resolve(cached) :
    axios({
      url: HOST+url,
      headers: {}
    }).then(function(res) {
      cache.set(token, url, res.data);
      return res.data;
    });
};

exports.post = (url, data) => {
  return axios({
      url: HOST+url,
      headers: {}
    }).then(function(res) {
    return res.data;
  });
};

