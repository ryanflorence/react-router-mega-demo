require('./ENV');
var http = require('http');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var uuid = require('uuid');
var cache = require('./utils/cache');
var getRoutes = require('./routes.js');
var fetchData = require('./utils/fetchData');
var indexHTML = fs.readFileSync(__dirname+'/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/../public/js/main.js');
var styles = fs.readFileSync(__dirname+'/assets/styles.css');
var write = require('./utils/write');
var cookie = require('cookie');

var getToken = (req) => {
  if (req.headers.cookie)
    return cookie.parse(req.headers.cookie).token;
  return uuid();
};

var renderApp = (req, cb) => {
  var path = req.url;
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;
  var token = getToken(req);

  var router = Router.create({
    routes: getRoutes(token),
    location: path,
    onAbort: cb,
    onError: function (err) {
      console.log('Routing Error');
      console.log(err);
    }
  });

  router.run((Handler, state) => {
    fetchData(token, state).then((data) => {
      var clientHandoff = { token, data: cache.clean(token) };
      var html = React.renderToString(<Handler data={data} />);
      var output = indexHTML.
         replace(htmlRegex, html).
         replace(dataRegex, JSON.stringify(clientHandoff));
      cb(null, output, token);
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
      renderApp(req, (redirect, html, token) => {
        if (redirect) {
          res.writeHead(303, { 'Location': redirect.to });
          res.end();
        }
        else {
          write(html, 'text/html', res, cookie.serialize('token', token, {
            maxAge: 30*24*60*60
          }));
        }
      });
  }
});

app.listen(process.env.PORT || 5000);

