var Promise = require('when');
var api = require('../utils/api');
var EventEmitter = require('events').EventEmitter;
var k = function() {};
var mergeInto = require('react/lib/mergeInto');
var _events = new EventEmitter();

var _state = {
  loaded: false,
  records: [],
  map: {}
};

if (ENV.CLIENT && window.ROUTER_PROPS.root)
  setState(window.ROUTER_PROPS.root.contacts);

exports.getById = function(id) {
  var preloaded = ENV.CLIENT && window.ROUTER_PROPS.contact;
  if (preloaded && preloaded.contact.id === id)
    return preloaded.contact;

  var cached = _state.map[id];
  if (cached)
    return cached;

  return api.get('/contacts/'+id).then(function(res) {
    return res.contact;
  });
};

exports.getAll = function() {
  if (_state.loaded) {
    // MUST BE SYNC. Otherwise we render one the client once while waiting for
    // the promise and then the checksum doesn't match up
    return _state;
  }

  return api.get('/contacts').then(function(data) {
    _state.loaded = true;
    _state.records = data.contacts;
    return _state;
  });
};

exports.add = ENV.CLIENT ? function(contact) {
  _state.records.push(contact);
  _state.map[contact.id] = contact;
  _events.emit('change');
} : k;

exports.addChangeListener = function(fn) {
  _events.on('change', fn);
};

exports.removeChangeListener = function(fn) {
  _events.off('change', fn);
};

function setState(newState) {
  mergeInto(_state, newState);
  _state.map = _state.records.reduce(function(map, record) {
    map[record.id] = record;
    return map;
  }, {});
}

