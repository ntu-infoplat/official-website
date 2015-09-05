var ColumnComponent = React.createClass({displayName: "ColumnComponent",
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
          console.error(status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data,
        columnComponentObject;

    columnComponentObject = data.map(function (column, i) {
      var date = column.date.split(',');
      return (
        React.createElement("div", {className: "column"}, 
          React.createElement("div", {className: "column-header vertical-center"}, 
            React.createElement("div", {className: "column-date"}, 
              React.createElement("div", null,  date[1] + " " + date[0] + " "), 
              React.createElement("div", null,  date[2] )
            ), 
            React.createElement("div", {className: "column-topic"}, 
              React.createElement("h2", null,  column.topic)
            )
          ), 
          React.createElement("div", {className: "column-content"}, 
            React.createElement("img", {src:  column.image}), 
            React.createElement("p", {dangerouslySetInnerHTML: {__html: column.content}})
          ), 
          React.createElement("div", {className: "column-link"}, 
            React.createElement("a", {href:  column.link}, "Read More...")
          )
        )
      )
    })

    return (
      React.createElement("div", {className: "column-wrapper"}, 
         columnComponentObject 
      )
    )
  }
});

module.exports = ColumnComponent ;
