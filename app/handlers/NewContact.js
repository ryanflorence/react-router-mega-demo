/** @jsx React.DOM */
var React = require('react');
var Navigation = require('react-router').Navigation;

var NewContactForm = module.exports = React.createClass({

  mixins: [Navigation],

  handleSubmit: function(event) {
    event.preventDefault();
    var first = this.refs.first.getDOMNode().value;
    var last = this.refs.last.getDOMNode().value;
    this.transitionTo('createContact', {}, {first: first, last: last});
  },

  render: function() {
    return (
      <div>
        <h1 className="Heading Heading--alt">New Contact</h1>
        <div className="Content padBox">
          <form
            action="/createContact"
            onSubmit={this.handleSubmit}
          >
            <p>
              <input ref="first" name="first" placeholder="first name"
              /> <input ref="last" name="last" placeholder="last name"
              /> <button type="submit">Add</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
});

