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

  getInitialState: function() {
    return {
      whereAmI: 'Server'
    };
  },

  componentDidMount: function() {
    this.setState({whereAmI: 'Client'});
  },

  render: function() {
    return (
      div({},
        h1({}, 'Where am I?: '+this.state.whereAmI),
        p({}, 'Open the console and see the HTML before and after the JS lands (hint, it is the same)'),
        p({}, 'The JS has a forced 1 second delay to show texture'),
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

