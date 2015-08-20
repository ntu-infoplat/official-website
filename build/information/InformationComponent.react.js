var InformationComponentClub = React.createClass({displayName: "InformationComponentClub",
  /**
   *  data: [
   *    {
   *      background: {
   *        type: String ('image')
   *        content: Array[String] (image src / color) ['src': 'url']
   *      },
   *      content: {
   *        header: String
   *        content: String
   *      }
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
        url: "json/information/informationComponentClub.json",
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
        informationClubBackground,
        informationClubContent,
        informationComponentClubObject;

    informationComponentClubObject = data.map(function (informationClub, i) {
      informationClubBackground = informationClub.background;
      informationClubContent = informationClub.content;
      var informationClubBackgroundStyle = {
        "backgroundImage": "url(" + informationClubBackground.content + ")"
      };
      return (
        React.createElement("div", {className: "information-club"}, 
          React.createElement("div", {className: "information-club-background-wrapper", style:  informationClubBackgroundStyle }), 
          React.createElement("div", {className: "information-club-content-wrapper horizontal-vertical-center"}, 
            React.createElement("div", {className: "information-club-content"}, 
              React.createElement("div", {className: "information-club-topic"}, 
                React.createElement("h2", null,  informationClubContent.header)
              ), 
              React.createElement("div", {className: "information-club-description"}, 
                 informationClubContent.content
              )
            )
          )
        )
      )
    })

    return (
      React.createElement("div", {className: "information-club-wrapper"}, 
         informationComponentClubObject 
      )
    )
  }
});

var InformationComponentNew = React.createClass({displayName: "InformationComponentNew",
  /**
   *  data: [
   *    {
   *      header: String
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
        url: "json/information/informationComponentNew.json",
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
        informationComponentNewObject;

    informationComponentNewObject = data.map(function (informationNew, i) {
      return (
        React.createElement("div", {className: "information-new vertical-center"}, 
          React.createElement("div", {className: "information-new-header"}, 
             informationNew.header
          ), 
          React.createElement("div", {className: "information-new-content"}, 
            React.createElement("a", {href:  informationNew.content},  informationNew.content)
          )
        )
      )
    })

    return (
      React.createElement("div", {className: "information-new-wrapper"}, 
         informationComponentNewObject 
      )
    )
  }
});

module.exports = {
  "InformationComponentClub": InformationComponentClub,
  "InformationComponentNew": InformationComponentNew
};
