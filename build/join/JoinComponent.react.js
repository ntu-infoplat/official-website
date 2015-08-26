var JoinComponent = React.createClass({displayName: "JoinComponent",
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: "json/join/joinComponent.json",
        dataType: 'json',
        success: function(data) {
          this.setState({ data: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data;
    return (
      React.createElement("div", {className: "join-wrapper"}, 
        React.createElement("h1", null, "How To Join Us"), 
        React.createElement(JoinSubComponent, {data:  data })
      )
    )
  }
});

var JoinSubComponent = React.createClass({displayName: "JoinSubComponent",
  /**
   *  data: [
   *    {
   *      header: String
   *      type: String ('text', 'list')
   *      content: String (list should be seperated by comma)
   *    }
   *  ]
   */
  render: function () {
    var data = this.props.data,
        joinSubComponentObject;

    joinSubComponentObject = data.map(function (joinSubComponent, i) {
      var joinSubComponentContent = joinSubComponent.content;
      console.log("joinSubComponentContent", joinSubComponentContent);
      if (joinSubComponent.type === "list") {
        joinSubComponentContent = joinSubComponentContent.split(',').map(function (content, i) {
          return React.createElement("p", {className: "join-listitem"},  content )
        });
      } else if (joinSubComponent.type === "text") {
        joinSubComponentContent = React.createElement("p", {dangerouslySetInnerHTML: {__html: content}})
      }
      return (
        React.createElement("div", {key:  i, className: "join-content-wrapper"}, 
          React.createElement("div", {className: "join-header"}, 
            React.createElement("h3", null,  joinSubComponent.header)
          ), 
          React.createElement("div", {className: "join-content"}, 
             joinSubComponentContent 
          )
        )
      )
    });

    return (
      React.createElement("div", {className: "join-block-wrapper"}, 
         joinSubComponentObject 
      )
    )
  }
});

module.exports = JoinComponent ;
