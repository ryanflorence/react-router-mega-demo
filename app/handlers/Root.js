/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Root = module.exports = React.createClass({

  statics: {
    getRouteProps: function() {
      var preloadedData = ENV.CLIENT && window.ROUTER_PROPS.root;
      return preloadedData || {
        contactData: api.get('/contacts')
      }
    }
  },

  renderContacts: function() {
    var contacts = this.props.contactData.contacts;
    return contacts.map(function(contact) {
      return <li>{contact.first} {contact.last}</li>;
    });
  },

  render: function() {
    return (
      <div>
        <h1>Hello Again!</h1>
        <ul>
          {this.renderContacts()}
        </ul>
      </div>
    );
  }
});

function fakeContacts() {
  var url = 'http://addressbook-api.herokuapp.com/contacts';
  return axios.get(url).then(function(res) {
    return res.data;
  });
}

