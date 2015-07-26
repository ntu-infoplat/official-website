
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
    console.log(this.props.data);
    console.log(this.state.data);
    var linkNode = this.state.data.map(function (link, i) {
      return (
        React.createElement("li", {key: i}, 
            React.createElement("a", {href: link.url}, link.title)
        )
      )
    });
    console.log(linkNode);
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "header-wrapper"}, 
          React.createElement("img", {src: "./imgs/icon/logo.svg"})
        ), 
        React.createElement("div", {className: "content-wrapper"}, 
          React.createElement("ul", null, linkNode)
        )
      )
    );
  }
});

React.render(React.createElement(NavBar, {data: "./json/navbar.json"}), document.getElementById('navbar'));
