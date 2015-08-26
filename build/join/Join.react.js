var Main = require('../Main.react.js'),
    JoinComponent = require('./JoinComponent.react.js'),
    mainNode = document.getElementById('main'),
    components = { "JoinComponent": JoinComponent };

React.render(React.createElement(Main, {data: "json/join/join.json", components:  components }), mainNode);
