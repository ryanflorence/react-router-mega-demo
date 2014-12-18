var Promise = require('when').Promise;
var axios = require('axios');
var cache = require('./cache');

var HOST = 'http://addressbook-api.herokuapp.com';
//var HOST = 'http://localhost:5001';

exports.get = (url, token) => {
  var cached = cache.get(token, url);
  return (cached) ?
    Promise.resolve(cached) :
    axios({
      url: HOST+url,
      headers: { 'Authorization': token }
    }).then(function(res) {
      cache.set(token, url, res.data);
      return res.data;
    });
};

exports.post = (url, data, token) => {
  return axios({
    method: 'post',
    data: data,
    url: HOST+url,
    headers: { 'Authorization': token }
  }).then(function(res) {
    return res.data;
  });
};

