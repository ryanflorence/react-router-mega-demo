require('./app/ENV');
var fs = require('fs');
var Promise = require('when').Promise;
var Router = require('react-router');
var Routes = Router.Routes;
var routes = require('./app/routes.js');

require('mach').serve(function (req, res) {
  console.log(req.path);

  switch (req.path) {
    case '/styles.css':
      return fs.readFileSync(__dirname+'/public/styles.css');
    case '/js/main.js':
      return fs.readFileSync(__dirname+'/public/js/main.js');
    case '/favicon.ico':
      return 'haha';
    default:
      return renderApp(req.path);
  }
});

function renderApp(path) {
  var indexHTML = fs.readFileSync(__dirname+'/public/index.html').toString();
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

  return new Promise(function(resolve, reject) {
    Router.renderRoutesToString(
      Routes({location: 'history', children: routes}),
      path,
      function(err, abortReason, html, data) {
        var html = indexHTML.
          replace(htmlRegex, html).
          replace(dataRegex, JSON.stringify(data));

        resolve(html);
      }
    );
  });
}

