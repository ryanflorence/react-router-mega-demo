/** @jsx React.DOM */
require('./ENV');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var fetchData = require('./utils/fetchData');
var rehydrate = require('./utils/rehydrate');
var cache = require('./utils/cache');
var container = require('./utils/container');

var renderState = {
  element: document.getElementById('app'),
  Handler: null,
  routerState: null
};

var render = () => {
  var { element, Handler, routerState } = renderState;
  var token = container.get('token');
  fetchData(token, routerState).then((data) => {
    React.render(<Handler data={data} />, element);
  });
};

container.set('token', rehydrate());

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
  renderState.Handler = Handler;
  renderState.routerState = routerState;
  render();
});

