require('./ENV');
var React = require('react');
var routes = require('./routes');
var div = document.getElementById('app');
React.renderComponent(routes, div, function() {
  // clear it out so it never gets used again, otherwise getRouteProps will
  // find this data even though it may have different params
  window.ROUTER_PROPS = {};
});

