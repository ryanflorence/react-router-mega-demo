var Route = require('react-router').Route;

module.exports = (
  Route({name: 'root', path: '/', handler: require('./handlers/Root')})
);

