/** @jsx React.DOM */
require('./ENV');
var React = require('react');
var Router = require('react-router');
var getRoutes = require('./routes');
var fetchData = require('./utils/fetchData');
var rehydrate = require('./utils/rehydrate');
var cache = require('./utils/cache');

var token = rehydrate();

var renderState = {
  element: document.getElementById('app'),
  Handler: null,
  routerState: null
};

var render = () => {
  var { element, Handler, routerState } = renderState;
  fetchData(token, routerState).then((data) => {
    React.render(<Handler data={data} />, element);
  });
};

Router.run(getRoutes(token), Router.HistoryLocation, function(Handler, routerState) {
  renderState.Handler = Handler;
  renderState.routerState = routerState;
  render();
});

