
var NavBar = React.createClass({displayName: "NavBar",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "header-wrapper"}, 
          React.createElement("div", {className: "logo"}, 
            React.createElement("img", {src: "../imgs/icon/logo.svg"})
          )
        ), 
        React.createElement("div", {className: "content-wrapper"}
        )
      )
    );
  }
});

React.render(React.createElement(NavBar, null), document.getElementById('navbar'));
