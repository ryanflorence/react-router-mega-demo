var all = require('when/keys').all;
var cache = require('./cache');

var cachePrerenderData = () => {
  Object.keys(__DATA__).forEach((key) => {
    cache.set(key, __DATA__[key]);
  });
};

var cleanPrerenderData = () => {
  cachePrerenderData();
  var data = __DATA__;
  __DATA__ = false;
  return data;
};

var getPrerenderData = () => {
  return (ENV.CLIENT && __DATA__) ?
    cleanPrerenderData() : false;
};

var fetchData = module.exports = (routerState) => {
  var data = getPrerenderData();
  if (data)
    return Promise.resolve(data);

  var { params, query } = routerState;
  return all(routerState.routes.filter((route) => {
    return route.handler.fetchData;
  }).reduce((promises, route) => {
    promises[route.name] = route.handler.fetchData(params, query);
    return promises;
  }, {}));
};

