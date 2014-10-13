webpackJsonp([1],{

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	var React = __webpack_require__(5);
	var ReactRouter = __webpack_require__(6);
	var Link = ReactRouter.Link;
	
	var Dashboard = React.createClass({displayName: 'Dashboard',
	
	  render: function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.h1(null, "Dashboard!"),
	        React.DOM.ul(null, 
	          React.DOM.li(null, Link( {to:"inbox"}, "Inbox"))
	        ),
	        this.props.activeRouteHandler()
	      )
	    );
	  }
	});
	
	module.exports = Dashboard;


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcblxudmFyIERhc2hib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Rhc2hib2FyZCcsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLmgxKG51bGwsIFwiRGFzaGJvYXJkIVwiKSxcbiAgICAgICAgUmVhY3QuRE9NLnVsKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKCB7dG86XCJpbmJveFwifSwgXCJJbmJveFwiKSlcbiAgICAgICAgKSxcbiAgICAgICAgdGhpcy5wcm9wcy5hY3RpdmVSb3V0ZUhhbmRsZXIoKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hib2FyZDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pzeC1sb2FkZXIhLi9hcHAvZGFzaGJvYXJkLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiMS5jaHVuay5qcyJ9