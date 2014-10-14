/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Contact = module.exports = React.createClass({

  statics: {
    getRouteProps: function(params) {
      var preloadedData = ENV.CLIENT && window.ROUTER_PROPS.contact;
      return preloadedData || {
        contact: api.get('/contacts/'+params.id).then(function(res) {
          return res.contact;
        })
      };
    }
  },

  render: function() {
    var contact = this.props.contact;

    if (!contact)
      return <div/>;

    return (
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
            <div className="KV">
              <div className="KV__Key"> </div>
              <div className="KV__Value">
                <a onClick={this.startEditing} href="#">edit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

