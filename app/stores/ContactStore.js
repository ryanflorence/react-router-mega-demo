var Promise = require('when');
var api = require('../utils/api');
var EventEmitter = require('events').EventEmitter;
var k = function() {};
var mergeInto = require('react/lib/mergeInto');

var _events = new EventEmitter();

var _state = {
  loaded: false,
  records: []
};

if (ENV.CLIENT && window.ROUTER_PROPS.root) {
  mergeInto(_state, window.ROUTER_PROPS.root.contacts);
}

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
  _events.emit('change');
} : k;

exports.addChangeListener = function(fn) {
  _events.on('change', fn);
};

exports.removeChangeListener = function(fn) {
  _events.off('change', fn);
};

