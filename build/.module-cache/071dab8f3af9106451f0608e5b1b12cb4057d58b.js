
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
          React.createElement("img", {src: "./imgs/icon/logo.svg"})
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
      React.createElement("div", {className: "width-50"}, 
        React.createElement("p", null, 
          "Infoplat.com", React.createElement("br", null), 
          "Copyright © Infoplat All Right Reserved."
        )
      )
    );
  }
});

React.render(React.createElement(NavBar, {data: "./json/navbar.json"}), document.getElementById('navbar'));
React.render(React.createElement(Footer, null), document.getElementById('footer'));
