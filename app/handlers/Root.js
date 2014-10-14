/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var Link = require('react-router').Link;

var Root = module.exports = React.createClass({

  statics: {
    getRouteProps: function() {
      var preloadedData = ENV.CLIENT && window.ROUTER_PROPS.root;
      return preloadedData || {
        contactData: api.get('/contacts')
      };
    }
  },

  renderContacts: function() {
    if (!this.props.contactData) return null;
    var contacts = this.props.contactData.contacts;
    return contacts.map(function(contact) {
      return <li key={contact.id}>
        <Link to="contact" params={{id: contact.id}}>{contact.first} {contact.last}</Link>
      </li>;
    });
  },

  render: function() {
    return (
      <div>
        <h1>Address Book</h1>
        <ul>
          {this.renderContacts()}
        </ul>
        {this.props.activeRouteHandler()}
      </div>
    );
  }
});
