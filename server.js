require('./app/ENV');
var fs = require('fs');
var Promise = require('when').Promise;
var Router = require('react-router');
var routes = require('./app/routes.js');
var indexHTML = fs.readFileSync(__dirname+'/public/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/public/js/main.js');

require('mach').serve(function (req, res) {
  switch (req.path) {
    case '/styles.css':
      return fs.readFileSync(__dirname+'/public/styles.css');
    case '/js/main.js':
      //return mainJS;
      return delayedJS();
    case '/favicon.ico':
      return 'haha';
    default:
      return renderApp(req.path);
  }
}, process.env.PORT || 5000);

function renderApp(path) {
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

  return new Promise(function(resolve, reject) {
    Router.renderRoutesToString(routes, path, function(err, ar, html, data) {
      var output = indexHTML.
        replace(htmlRegex, html).
        replace(dataRegex, JSON.stringify(data));

      resolve(output);
    });
  });
}

function delayedJS() {
  // force download dely to 1 second on client-side JS file
  // to exaggerate the effect
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(mainJS);
    }, 1000);
  });
}

