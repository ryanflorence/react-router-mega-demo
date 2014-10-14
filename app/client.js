require('./ENV');
var React = require('react');
var routes = require('./routes');
var div = document.getElementById('app');
React.renderComponent(routes, div);

