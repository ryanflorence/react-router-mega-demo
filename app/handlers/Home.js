/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Home = module.exports = React.createClass({
  render: function() {
    return (
      <div className="Detail">
        <h1 className="Heading Heading--alt">Welcome!</h1>
        <div className="Content padBox">
          <p>This app is rendered on the server and the client with React</p>
          <p>You can actually turn off JavaScript and everything is still fully functional</p>
          <p>Go ahead and create a new contact over on the left with and without JS enabled</p>
          <p><a href="https://github.com/rackt/react-router-mega-demo">Code can be found here</a></p>
        </div>
      </div>
    );
  }
});

