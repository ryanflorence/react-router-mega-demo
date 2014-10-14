require('./ENV');
var React = require('react');
var routes = require('./routes');
var div = document.getElementById('app');

console.log('html from the server');
console.log(div.innerHTML);

React.renderComponent(routes, div, function() {
  console.log('html after client render');
  console.log(div.innerHTML);
});

