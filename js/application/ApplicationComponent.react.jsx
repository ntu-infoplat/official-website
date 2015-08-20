var ApplicationComponent = React.createClass({
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
        <div className="application">
          <div className="application-header vertical-center">
            <div className="application-date">
              <div>{ date[1] + " " + date[0] + " "}</div>
              <div>{ date[2] }</div>
            </div>
            <div className="application-topic">
              <h2>{ application.topic }</h2>
            </div>
          </div>
          <div className="application-content" dangerouslySetInnerHTML={{__html: application.content}}></div>
        </div>
      )
    })

    return (
      <div className="application-wrapper">
        { applicationComponentObject }
      </div>
    )
  }
});

module.exports = ApplicationComponent ;
