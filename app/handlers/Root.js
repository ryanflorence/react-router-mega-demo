var React = require('react');
var { Link, RouteHandler } = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var api = require('../utils/api');

var sortContacts = (contacts) => {
  return contacts.slice(0).sort((a, b) => {
    a = (a.first+' '+a.last).toLowerCase();
    b = (b.first+' '+b.last).toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  });
};

var Root = module.exports = React.createClass({

  statics: {
    fetchData: () => {
      return api.get('/contacts', 'contacts');
    }
  },

  renderContacts: function() {
    return sortContacts(this.props.data.root.contacts).map((contact) => {
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
          <RouteHandler {...this.props} />
        </TransitionGroup>
      </div>
    );
  }
});
