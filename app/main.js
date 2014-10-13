require('./ENV');
var React = require('react');
var routes = require('./routes');
console.log(JSON.stringify(routes.props));
React.renderComponent(routes, document.getElementById('app'));

//require('react-router').renderRoutesToString(routes, '/', function(err, ar, html, data) {
  //debugger;
//});
