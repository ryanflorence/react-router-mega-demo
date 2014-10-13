var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;

module.exports = (
  Routes({location: "history"},
    Route({name: 'root', path: '/', handler: require('./handlers/Root')})
  )
);

