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
      <div>
        <h2>{contact.first} {contact.last}</h2>
      </div>
    );
  }
});

