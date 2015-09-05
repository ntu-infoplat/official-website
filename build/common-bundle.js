(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Navbar = require('./Navbar.react.js'),
    Footer = require('./Footer.react.js'),
    navbarNode = document.getElementById('navbar'),
    footerNode = document.getElementById('footer');

React.render(React.createElement(Navbar, {data: "json/navbar.json"}), navbarNode);
React.render(React.createElement(Footer, null), footerNode);

},{"./Footer.react.js":2,"./Navbar.react.js":3}],2:[function(require,module,exports){
var Footer = React.createClass({displayName: "Footer",
  render: function () {
    return (
      React.createElement("div", {className: "width-75"}, 
        React.createElement("div", {className: "horizontal-vertical-center"}, 
          React.createElement("span", null, 
            "InfoPlat  |  ", 
            React.createElement("a", {rel: "license", href: "https://creativecommons.org/licenses/by-nc-sa/4.0/"}, 
              "CC-BY-NC-SA 4.0"
            )
          )
        )
      )
    );
  }
});

module.exports = Footer ;

},{}],3:[function(require,module,exports){
var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function() {
    return {
      data: []
    }
  },
  componentDidMount: function() {
    // console.log(this.state.data);
    $.ajax({
        url: this.props.data,
        dataType: 'json',
        success: function(data){
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.data, status, err.toString());
        }.bind(this)
    })
  },
  mobileNavbarOnClick: function () {
    var main = $('div.main'),
        navbar = $('nav#navbar'),
        mobileNavbar = $('nav#navbar .mobileNavbar');
    main.toggleClass('active');
    navbar.toggleClass('active');
    mobileNavbar.toggleClass('active');
  },
  render: function () {
    var linkNode = this.state.data.map(function (link, i) {
      return (
        React.createElement("li", {key: i}, 
          React.createElement("a", {className: "horizontal-vertical-center", href: link.url}, link.title), 
          React.createElement("a", {className: "horizontal-vertical-center", href: link.url}, link.title)
        )
      )
    });
    return (
      React.createElement("div", {className: "content-wrapper"}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("a", {href: "index.html"}, 
            React.createElement("img", {src: "./imgs/icon/logo_shadow.svg"})
          )
        ), 
        React.createElement("div", {className: "content"}, 
          React.createElement("ul", null, linkNode)
        ), 
        React.createElement("div", {className: "mobileNavbar horizontal-vertical-center", onClick:  this.mobileNavbarOnClick}, 
          React.createElement("img", {src: "imgs/icon/logo_img.svg"}), 
          React.createElement("i", {className: "fa fa-angle-right fa-6"})
        )
      )
    );
  }
});

module.exports = Navbar ;

},{}]},{},[1]);
