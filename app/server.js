require('./ENV');
var http = require('http');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var uuid = require('uuid');
var cache = require('./utils/cache');
var routes = require('./routes.js');
var fetchData = require('./utils/fetchData');
var indexHTML = fs.readFileSync(__dirname+'/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/../public/js/main.js');
var styles = fs.readFileSync(__dirname+'/assets/styles.css');
var write = require('./utils/write');

var renderApp = (path, cb) => {
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;
  var token = uuid();

  var router = Router.create({
    routes: routes,
    location: path,
    onAbort: cb
  });

  router.run((Handler, state) => {
    fetchData(token, state).then((data) => {
      var clientHandoff = { token, data: cache.clean(token) };
      var html = React.renderToString(<Handler data={data} />);
      var output = indexHTML.
         replace(htmlRegex, html).
         replace(dataRegex, JSON.stringify(clientHandoff));
      cb(null, output);
    });
  });
};

var app = http.createServer((req, res) => {
  switch (req.url) {
    case '/js/main.js':
      return write(mainJS, 'text/javascript', res);
    case '/favicon.ico':
      return write('haha', 'text/plain', res);
    case '/styles.css':
      return write(styles, 'text/css', res);
    default:
      renderApp(req.url, (redirect, html) => {
        if (redirect) {
          res.writeHead(303, { 'Location': redirect.to });
          res.end();
        }
        else
          write(html, 'text/html', res);
      });
  }
});

app.listen(process.env.PORT || 5000);

