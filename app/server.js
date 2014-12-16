require('./ENV');
var http = require('http');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');
var fetchData = require('./utils/fetchData');
var indexHTML = fs.readFileSync(__dirname+'/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/../public/js/main.js');
var styles = fs.readFileSync(__dirname+'/assets/styles.css');

var write = (string, res) => {
  res.write(string);
  res.end();
};

var renderApp = (path, cb) => {
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

  var router = Router.create({
    routes: routes,
    location: path,
    onAbort: cb
  });

  router.run((Handler, state) => {
    fetchData(state).then((data) => {
      var html = React.renderToString(<Handler data={data} />);
       var output = indexHTML.
         replace(htmlRegex, html).
         replace(dataRegex, JSON.stringify(data));
      cb(null, output);
    });
  });
};

var app = http.createServer((req, res) => {
  switch (req.url) {
    case '/js/main.js':
      return write(mainJS, res);
    case '/favicon.ico':
      return write('haha', res);
    case '/styles.css':
      return write(styles, res);
    default:
      renderApp(req.url, (redirect, html) => {
        if (redirect) {
          res.writeHead(303, {
            'Location': redirect.to
          });
          res.end();
        }
        else
          write(html, res);
      });
  }
});

app.listen(process.env.PORT || 5000);

