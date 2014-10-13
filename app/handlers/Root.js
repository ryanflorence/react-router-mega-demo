var React = require('react');
var Promise = require('when').Promise;
var div = React.DOM.div;
var h1 = React.DOM.h1;
var br = React.DOM.br;
var button = React.DOM.button;
var p = React.DOM.p;

function getServerProps() {
  return {
    colors: getColors(),
    tacos: getTacos()
  };
}

function getClientProps() {
  return window.ROUTER_PROPS.root;
}

var Root = module.exports = React.createClass({

  statics: {
    getRouteProps: ENV.SERVER ? getServerProps : getClientProps
  },

  getDefaultProps: function() {
    return {
      tacos: [],
      colors: []
    };
  },

  getInitialState: function() {
    return {
      whereAmI: ENV.CLIENT ? 'client' : 'server'
    };
  },

  render: function() {
    return (
      div({},
        h1({}, 'Where am I? ' + this.state.whereAmI),
        p({}, 'The JS file has a forced 1 second delay so you can see when it lands'),
        p({},
          this.props.colors.join(', '),
          br(),
          this.props.tacos.join(', ')
        )
      )
    );
  }
});

function getColors() {
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res(['red', 'yellow', 'green']);
    }, 100);
  });
}

function getTacos() {
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res(['carnitas', 'pollo', 'carne asada']);
    }, 200);
  });
}

