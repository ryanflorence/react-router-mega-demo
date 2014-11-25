var EventEmitter = require('events').EventEmitter;
var mergeInto = require('react/lib/mergeInto');

module.exports = createStore;

function createStore(initialState) {
  var events = new EventEmitter();
  var state = initialState || {};

  return {

    setState: function(newState) {
      mergeInto(state, newState);
      this.emitChange();
    },

    getState: function() {
      return state;
    },

    addChangeListener: function (listener) {
      events.on('change', listener);
    },

    removeChangeListener: function (listener) {
      events.removeListener('change', listener);
    },

    emitChange: function() {
      events.emit('change');
    }
  };
};
