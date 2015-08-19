var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function(){
    return {
      data: []
    }
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
          React.createElement("a", {href: "index.html"},
            React.createElement("img", {src: "./imgs/icon/logo_shadow.svg"})
          )
        ),
        React.createElement("div", {className: "content"},
          React.createElement("ul", null, linkNode)
        )
      )
    );
  }
});

module.exports = Navbar ;
