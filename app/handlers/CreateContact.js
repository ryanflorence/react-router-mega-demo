/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var ContactStore = require('../stores/ContactStore');

var CreateContact = module.exports = React.createClass({

  statics: {
    willTransitionTo: function(transition, params, query) {
      transition.wait(
        api.post('/contacts', {contact: query}).then(function(data) {
          ContactStore.add(data.contact);
          transition.redirect('contact', {id: data.contact.id});
        })
      );
    }
  },

  render: function() {
    return null;
  }

});

