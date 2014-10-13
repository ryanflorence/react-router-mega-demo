require('./ENV');
var React = require('react');
var Routes = require('react-router').Routes;

React.renderComponent(
  Routes({location: "history", children: require('./routes')}),
  document.body
);

