var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;

module.exports = (
  Routes({location: "history"},
    Route({
      handler: require('./handlers/Root'),
      name: 'root',
      path: '/'
    })
  )
);

