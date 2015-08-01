
/**
 *  NavBar
 */

var NavBar = React.createClass({
  getInitialState: function(){
    return({data: []})
  },
  componentDidMount: function(){
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
          <img src="./imgs/icon/logo.svg"/>
        </div>
        <div className="content">
          <ul>{linkNode}</ul>
        </div>
      </div>
    );
  }
});

/**
 *  Footer
 */

var Footer = React.createClass({
  render: function () {
    return (
      <div className="width-50">
        <p>InfoPlat.org</p>
        <p> <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a></p>
      </div>
    );
  }
});

React.render(<NavBar data="./json/navbar.json"/>, document.getElementById('navbar'));
React.render(<Footer />, document.getElementById('footer'));
