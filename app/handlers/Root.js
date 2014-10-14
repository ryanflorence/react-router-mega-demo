/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var Link = require('react-router').Link;
var NewContactForm = require('../components/NewContactForm');
var ContactStore = require('../stores/ContactStore');

var Root = module.exports = React.createClass({

  statics: {
    getRouteProps: function() {
      return {
        contacts: ContactStore.getAll()
      };
    }
  },

  getInitialState: function() {
    return {
      contacts: this.props.contacts
    };
  },

  componentWillReceiveProps: function(newProps) {
    // because we have to put it on state, we have to get the new props
    this.setState({contacts: newProps.contacts});
  },

  renderContacts: function() {
    if (!this.props.contacts)
      return null;

    var contacts = this.state.contacts.records;
    return contacts.map(function(contact) {
      return <li key={contact.id}>
        <Link to="contact" params={{id: contact.id}}>{contact.first} {contact.last}</Link>
      </li>;
    });
  },

  componentDidMount: function() {
    ContactStore.addChangeListener(this.handleContactsChange);
  },

  componentWillUnmount: function() {
    ContactStore.removeChangeListener(this.handleContactsChange);
  },

  handleContactsChange: function() {
    this.setState({contactData: ContactStore.getAll()});
  },

  render: function() {
    return (
      <div>
        <h1>Address Book</h1>
        <NewContactForm/>
        <ul>
          {this.renderContacts()}
        </ul>
        {this.props.activeRouteHandler()}
      </div>
    );
  }
});
