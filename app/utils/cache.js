var cache = {};

exports.set = (key, data) => {
  if (ENV.CLIENT)
    cache[key] = data;
};

exports.get = (key) => {
  return cache[key];
};
