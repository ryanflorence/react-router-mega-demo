var Promise = require('when');
var api = require('../utils/api');
var EventEmitter = require('events').EventEmitter;
var k = function() {};
var mergeInto = require('react/lib/mergeInto');
var _events = new EventEmitter();
var Router = require('react-router');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;


var _state = {
  loaded: false,
  records: [],
  map: {}
};

var prerenderData = Router.getAsyncPropsForRoute('root');
if (prerenderData)
  setState(prerenderData.contacts);

exports.getById = function(id) {
  var preloaded = Router.getAsyncPropsForRoute('contact');
  if (preloaded)
    return preloaded.contact;

  var cached = _state.map[id];
  if (cached)
    return cached;

  return api.get('/contacts/'+id).then(function(res) {
    return res.contact;
  });
};

exports.getAll = function() {
  if (ENV.CLIENT && _state.loaded) {
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

