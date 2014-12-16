/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var CreateContact = module.exports = React.createClass({

  statics: {
    willTransitionTo: (transition, params, query) => {
      transition.wait(
        api.post('/contacts', {contact: query}).then(function(data) {
          // TODO: I'd prefer to not construct this url myself
          transition.redirect(`/contact/${data.contact.id}`);
        })
      );
    }
  },

  render: function() {
    return null;
  }

});

