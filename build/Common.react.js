var Navbar = require('./Navbar.react.js'),
    Footer = require('./Footer.react.js'),
    navbarNode = document.getElementById('navbar'),
    footerNode = document.getElementById('footer');

React.render(React.createElement(Navbar, {data: "json/navbar.json"}), navbarNode);
React.render(React.createElement(Footer, null), footerNode);
