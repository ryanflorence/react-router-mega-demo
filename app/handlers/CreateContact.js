/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var cache = require('../utils/cache');
var container = require('../utils/container');

var CreateContact = module.exports = React.createClass({

  statics: {
    willTransitionTo: (transition, params, query) => {
      var url = '/contacts';
      transition.wait(
        api.post(url, {contact: query}).then(function(data) {
          cache.expire(container.get('token'), url);
          transition.redirect(`/contact/${data.contact.id}`);
        })
      );
    }
  },

  render: function() {
    return null;
  }

});

