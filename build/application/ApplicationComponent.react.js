var ApplicationComponent = React.createClass({displayName: "ApplicationComponent",
  /**
   *  data: [
   *    {
   *      date: String (2015,NOV,13)
   *      topic: String
   *      image: String
   *      content: String
   *    }
   *    ...
   *  ]
   */
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: "json/application/applicationComponent.json",
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
    var data = this.state.data,
        applicationComponentObject;

    applicationComponentObject = data.map(function (application, i) {
      var date = application.date.split(',');
      return (
        React.createElement("div", {className: "application"}, 
          React.createElement("div", {className: "application-header vertical-center"}, 
            React.createElement("div", {className: "application-date"}, 
              React.createElement("div", null,  date[1] + " " + date[0] + " "), 
              React.createElement("div", null,  date[2] )
            ), 
            React.createElement("div", {className: "application-topic"}, 
              React.createElement("h2", null,  application.topic)
            )
          ), 
          React.createElement("div", {className: "application-content", dangerouslySetInnerHTML: {__html: application.content}})
        )
      )
    })

    return (
      React.createElement("div", {className: "application-wrapper"}, 
         applicationComponentObject 
      )
    )
  }
});

module.exports = ApplicationComponent ;
