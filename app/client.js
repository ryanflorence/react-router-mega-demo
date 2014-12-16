/** @jsx React.DOM */
require('./ENV');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var fetchData = require('./utils/fetchData');

var div = document.getElementById('app');

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
  fetchData(routerState).then((data) => {
    React.render(<Handler data={data} />, div);
  });
});

