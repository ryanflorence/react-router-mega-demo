require('./ENV');
var React = require('react');
var routes = require('./routes');
var div = document.getElementById('app');
console.log(div.innerHTML);
React.renderComponent(routes, div, function() {
  console.log(div.innerHTML);
});

