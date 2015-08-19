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
