var ColumnComponent = React.createClass({
  /**
   *  data: [
   *    {
   *      date: String (2015,NOV,13)
   *      topic: String
   *      image: String
   *      content: String
   *      link: String
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
        url: "json/column/columnComponent.json",
        dataType: 'json',
        success: function(data) {
          this.setState({ data: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.data, status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data,
        columnComponentObject;

    columnComponentObject = data.map(function (column, i) {
      var date = column.date.split(',');
      return (
        <div className="column">
          <div className="column-header vertical-center">
            <div className="column-date">
              <div>{ date[1] + " " + date[0] + " "}</div>
              <div>{ date[2] }</div>
            </div>
            <div className="column-topic">
              <h2>{ column.topic }</h2>
            </div>
          </div>
          <div className="column-content" dangerouslySetInnerHTML={{__html: column.content}}></div>
          <div className="column-link">
            <a href={ column.link }>Read More...</a>
          </div>
        </div>
      )
    })

    return (
      <div className="column-wrapper">
        { columnComponentObject }
      </div>
    )
  }
});

module.exports = ColumnComponent ;
