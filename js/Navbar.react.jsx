var Navbar = React.createClass({
  getInitialState: function(){
    return {
      data: []
    }
  },
  componentDidMount: function(){
    console.log(this.state.data);
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
        <li key={i}>
            <a className="horizontal-vertical-center" href={link.url}>{link.title}</a>
        </li>
      )
    });
    return (
      <div className="content-wrapper">
        <div className="header">
          <img src="./imgs/icon/logo_shadow.svg"/>
        </div>
        <div className="content">
          <ul>{linkNode}</ul>
        </div>
      </div>
    );
  }
});

module.exports = Navbar ;
