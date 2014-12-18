/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var cache = require('../utils/cache');

var CreateContact = module.exports = React.createClass({

  statics: {
    willTransitionTo: (transition, params, query) => {
      var url = '/contacts';
      var token = CreateContact.token;
      transition.wait(
        api.post(url, {contact: query}, token).then(function(data) {
          cache.expire(token, url);
          transition.redirect(`/contact/${data.contact.id}`);
        })
      );
    }
  },

  render: function() {
    return null;
  }

});

