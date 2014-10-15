/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var ContactStore = require('../stores/ContactStore');

var Contact = module.exports = React.createClass({

  statics: {
    getRouteProps: function(params) {
      return {
        contact: ContactStore.getById(params.id)
      };
    }
  },

  render: function() {
    var contact = this.props.contact;

    if (!contact)
      return <div/>;

    return (
      <div className="Detail">
        <div className="Contact">
          <h1 className="Heading Heading--alt">{contact.first} {contact.last}</h1>
          <div className="Content padBox">
            <img className="Avatar" key={contact.id} src={contact.avatar}/>
            <div className="KVSet">
              <div className="KV">
                <div className="KV__Key">First Name</div>
                <div className="KV__Value">{contact.first}</div>
              </div>
              <div className="KV">
                <div className="KV__Key">Last Name</div>
                <div className="KV__Value">{contact.last}</div>
              </div>
              <div className="KV">
                <div className="KV__Key">Avatar URL</div>
                <div className="KV__Value">{contact.avatar}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

