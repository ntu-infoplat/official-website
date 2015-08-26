var JoinComponent = React.createClass({
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
      <div className="join-wrapper">
        <h1>How To Join Us</h1>
        <JoinSubComponent data={ data }/>
      </div>
    )
  }
});

var JoinSubComponent = React.createClass({
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
          return <p className="join-listitem">{ content }</p>
        });
      } else if (joinSubComponent.type === "text") {
        joinSubComponentContent = <p dangerouslySetInnerHTML={{__html: content}}></p>
      }
      return (
        <div key={ i } className="join-content-wrapper">
          <div className="join-header">
            <h3>{ joinSubComponent.header }</h3>
          </div>
          <div className="join-content">
            { joinSubComponentContent }
          </div>
        </div>
      )
    });

    return (
      <div className="join-block-wrapper">
        { joinSubComponentObject }
      </div>
    )
  }
});

module.exports = JoinComponent ;
