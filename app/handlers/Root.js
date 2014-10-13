var React = require('react');
var Promise = require('when').Promise;
var div = React.DOM.div;
var h1 = React.DOM.h1;
var br = React.DOM.br;
var button = React.DOM.button;

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

  render: function() {
    return (
      div({},
        h1({}, 'APP YES!'),
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

