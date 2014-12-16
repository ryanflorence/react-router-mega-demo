var React = require('react');
var { DefaultRoute, Route } = require('react-router');

//module.exports = (
  //<Route name="root" path="/" handler={require('./handlers/Root')}>
    //<DefaultRoute handler={require('./handlers/Home')} />
    //<Route name="contact" path="contact/:id" handler={require('./handlers/Contact')} />
    //<Route name="newContact" handler={require('./handlers/NewContact')} />
    //<Route name="createContact" handler={require('./handlers/CreateContact')} />
  //</Route>
//);

var Dumb = React.createClass({ render () { return null } });

module.exports = (
  <Route name="root" path="/" handler={require('./handlers/Root')}>
    <DefaultRoute handler={require('./handlers/Home')} />
    <Route name="contact" path="contact/:id" handler={require('./handlers/Contact')} />
    <Route name="newContact" handler={require('./handlers/newContact')} />
    <Route name="createContact" handler={require('./handlers/createContact')} />
  </Route>
);

