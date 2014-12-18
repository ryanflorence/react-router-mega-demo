var cache = {};

var ensureTokenKey = (token) => {
  if (!cache[token])
    cache[token] = {};
};

exports.set = (token, key, data) => {
  ensureTokenKey(token);
  cache[token][key] = data;
};

exports.get = (token, key) => {
  ensureTokenKey(token);
  return cache[token][key];
};

exports.clean = (token) => {
  var data = cache[token];
  delete cache[token];
  return data;
};

exports.expire = (token, key) => {
  ensureTokenKey(token);
  delete cache[token][key];
};

