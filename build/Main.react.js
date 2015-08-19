var ContentBlock = require('./ContentBlock.react.js'),
    BackgroundBlock = require('./BackgroundBlock.react.js');

var Main = React.createClass({displayName: "Main",
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: this.props.data,
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
        components = this.props.components,
        mainSection;

    mainSection = data.map(function (section, i) {
      var sectionId = section.id,
          sectionClass = section.cssClass,
          background = section['background-data'],
          content = section['content-data'];

      return (
        React.createElement("section", {key:  i, id:  sectionId, className:  sectionClass }, 
          React.createElement(BackgroundBlock, {data:  background }), 
          React.createElement(ContentBlock, {data:  content, components:  components })
        )
      )
    });

    return (
      React.createElement("div", {className: "main"}, 
         mainSection 
      )
    )
  }
});

module.exports = Main ;
