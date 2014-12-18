var container = {};

exports.set = (name, obj) => {
  container[name] = obj;
};

exports.get = (name) => {
  return container[name];
};

