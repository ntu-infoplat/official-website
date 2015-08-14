
/**
 *  NavBar
 */

var NavBar = React.createClass({displayName: "NavBar",
  getInitialState: function(){
    return({data: []})
  },
  componentDidMount: function(){
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
  render: function () {
    var linkNode = this.state.data.map(function (link, i) {
      return (
        React.createElement("li", {key: i}, 
            React.createElement("a", {className: "horizontal-vertical-center", href: link.url}, link.title)
        )
      )
    });
    return (
      React.createElement("div", {className: "content-wrapper"}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("img", {src: "./imgs/icon/logo_shadow.svg"})
        ), 
        React.createElement("div", {className: "content"}, 
          React.createElement("ul", null, linkNode)
        )
      )
    );
  }
});

/**
 *  Footer
 */

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


React.render(React.createElement(NavBar, {data: "./json/navbar.json"}), document.getElementById('navbar'));
React.render(React.createElement(Footer, null), document.getElementById('footer'));
