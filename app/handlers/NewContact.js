/** @jsx React.DOM */
var React = require('react');
var Navigation = require('react-router').Navigation;

var NewContactForm = module.exports = React.createClass({

  mixins: [Navigation],

  handleSubmit: function(event) {
    event.preventDefault();
    var first = this.refs.first.getDOMNode().value;
    var last = this.refs.last.getDOMNode().value;
    var avatar = this.refs.avatar.getDOMNode().avatar;
    this.transitionTo('createContact', {}, {first: first, last: last, avatar: avatar});
  },

  render: function() {
    return (
      <div className="Detail">
        <h1 className="Heading Heading--alt">New Contact</h1>
        <div className="Content padBox">
          <form
            action="/createContact"
            onSubmit={this.handleSubmit}
          >
            <p>
              <input ref="first" name="first" placeholder="first name"/><br/>
              <input ref="last" name="last" placeholder="last name"/><br/>
              <input ref="avatar" name="avatar" placeholder="avatar url"/><br/>
              <button type="submit">Add</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
});

