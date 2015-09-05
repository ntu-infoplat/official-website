var Navbar = React.createClass({
  getInitialState: function() {
    return {
      data: []
    }
  },
  componentDidMount: function() {
    // console.log(this.state.data);
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
  mobileNavbarOnClick: function () {
    var main = $('div.main'),
        navbar = $('nav#navbar'),
        mobileNavbar = $('nav#navbar .mobileNavbar');
    main.toggleClass('active');
    navbar.toggleClass('active');
    mobileNavbar.toggleClass('active');
  },
  render: function () {
    var linkNode = this.state.data.map(function (link, i) {
      return (
        <li key={i}>
          <a className="horizontal-vertical-center" href={link.url}>{link.title}</a>
          <a className="horizontal-vertical-center" href={link.url}>{link.title}</a>
        </li>
      )
    });
    return (
      <div className="content-wrapper">
        <div className="header">
          <a href="index.html">
            <img src="./imgs/icon/logo_shadow.svg"/>
          </a>
        </div>
        <div className="content">
          <ul>{linkNode}</ul>
        </div>
        <div className="mobileNavbar horizontal-vertical-center" onClick={ this.mobileNavbarOnClick }>
          <img src="imgs/icon/logo_img.svg"></img>
          <i className="fa fa-angle-right fa-6"></i>
        </div>
      </div>
    );
  }
});

module.exports = Navbar ;
