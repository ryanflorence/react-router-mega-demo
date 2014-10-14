var axios = require('axios');
var HOST = 'http://addressbook-api.herokuapp.com';

exports.get = function(url) {
  return axios.get(HOST+url).then(function(res) {
    return res.data;
  });
};

exports.post = function(url, data) {
  return axios.post(HOST+url, data).then(function(res) {
    return res.data;
  });
};

