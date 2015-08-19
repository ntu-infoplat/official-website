var Main = require('../Main.react.js'),
    Navbar = require('../Navbar.react.js'),
    Footer = require('../Footer.react.js'),
    navbarNode = document.getElementById('navbar'),
    mainNode = document.getElementById('main'),
    footerNode = document.getElementById('footer');

React.render(React.createElement(Navbar, {data: "json/navbar.json"}), navbarNode);
React.render(React.createElement(Main, {data: "json/index/index.json"}), mainNode);
React.render(React.createElement(Footer, null), footerNode);
