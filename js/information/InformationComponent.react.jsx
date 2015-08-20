var InformationComponentClub = React.createClass({
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
        <div className="information-club">
          <div className="information-club-background-wrapper" style={ informationClubBackgroundStyle }></div>
          <div className="information-club-content-wrapper horizontal-vertical-center">
            <div className="information-club-content">
              <div className="information-club-topic">
                <h2>{ informationClubContent.header }</h2>
              </div>
              <div className="information-club-description">
                { informationClubContent.content }
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="information-club-wrapper">
        { informationComponentClubObject }
      </div>
    )
  }
});

var InformationComponentNew = React.createClass({
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
        <div className="information-new vertical-center">
          <div className="information-new-header">
            { informationNew.header }
          </div>
          <div className="information-new-content">
            <a href={ informationNew.content }>{ informationNew.content }</a>
          </div>
        </div>
      )
    })

    return (
      <div className="information-new-wrapper">
        { informationComponentNewObject }
      </div>
    )
  }
});

module.exports = {
  "InformationComponentClub": InformationComponentClub,
  "InformationComponentNew": InformationComponentNew
};
