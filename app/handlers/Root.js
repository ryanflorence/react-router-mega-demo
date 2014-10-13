var React = require('react');
var Promise = require('when').Promise;
var div = React.DOM.div;
var h1 = React.DOM.h1;
var br = React.DOM.br;
var button = React.DOM.button;
var p = React.DOM.p;

function getServerProps() {
  return {
    colors: ['red', 'yellow', 'green'],
    tacos: new Promise(function(res, rej) {
      setTimeout(function() {
        res(['carnitas', 'pollo', 'carne asada']);
      }, 1000);
    })
  }
}

function getClientProps() {
  return window.ROUTER_PROPS.root;
}

var Root = module.exports = React.createClass({
  statics: {
    getRouteProps: ENV.SERVER ? getServerProps : getClientProps
  },

  log: function() {
    console.log('clicked!');
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
        button({onClick: this.log}, 'am i alive?'),
        div({},
          this.props.colors.join(', '),
          br(),
          this.props.tacos.join(', ')
        )
      )
    );
  }
});

