/** @jsx React.DOM */

var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

module.exports = (
  <Routes location="history">
    <Route name="root" path="/" handler={require('./handlers/Root')}>
      <DefaultRoute handler={require('./handlers/Home')} />
      <Route name="contact" path="contact/:id" handler={require('./handlers/Contact')} />
    </Route>
  </Routes>
);

