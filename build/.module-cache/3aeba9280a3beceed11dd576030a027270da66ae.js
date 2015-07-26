
var NavBar = React.createClass({displayName: "NavBar",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "header-wrapper"}, 
          React.createElement("img", {src: "./imgs/icon/logo.svg"})
        ), 
        React.createElement("div", {className: "content-wrapper"}, 
          React.createElement("ul", null)
        )
      )
    );
  }
});

React.render(React.createElement(NavBar, null), document.getElementById('navbar'));
