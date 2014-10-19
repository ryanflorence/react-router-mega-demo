/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var Link = require('react-router').Link;
var ContactStore = require('../stores/ContactStore');
var ActiveState = require('react-router').ActiveState;
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Root = module.exports = React.createClass({

  mixins: [ActiveState],

  statics: {
    getAsyncProps: function() {
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

  componentDidMount: function() {
    ContactStore.addChangeListener(this.handleContactsChange);
  },

  componentWillUnmount: function() {
    ContactStore.removeChangeListener(this.handleContactsChange);
  },

  handleContactsChange: function() {
    this.setState({contactData: ContactStore.getAll()});
  },

  renderContacts: function() {
    if (!this.props.contacts)
      return null;

    return this.state.contacts.records.slice(0).sort(function(a, b) {
      a = (a.first+' '+a.last).toLowerCase();
      b = (b.first+' '+b.last).toLowerCase();
      return a > b ? 1 : a < b ? -1 : 0
    }).map(function(contact) {
      return (
        <li className="ContactList__Contact" key={contact.id}>
          <Link
            className="ContactList__Link"
            to="contact"
            params={{id: contact.id}}
          >
            {contact.first} {contact.last}
          </Link>
        </li>
      );
    });
  },

  render: function() {
    return (
      <div className="App">
        <div className="Master">
          <h2 className="Heading">Contacts</h2>
          <div className="Content">
            <ul className="ContactList">
              <li className="ContactList__Contact" key="__newLink__">
                <Link
                  className="ContactList__Link ContactList__Link--new"
                  to="newContact"
                >New Contact</Link>
              </li>
              {this.renderContacts()}
            </ul>
          </div>
        </div>

        <TransitionGroup transitionName="detail">
          {this.props.activeRouteHandler()}
        </TransitionGroup>
      </div>
    );
  }
});
