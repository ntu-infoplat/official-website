var Navbar = require('./Navbar.react.js'),
    Footer = require('./Footer.react.js'),
    navbarNode = document.getElementById('navbar'),
    footerNode = document.getElementById('footer');

React.render(<Navbar data="json/navbar.json"/>, navbarNode);
React.render(<Footer />, footerNode);
