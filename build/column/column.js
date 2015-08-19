var Main = require('../Main.react.js'),
    mainNode = document.getElementById('main');

React.render(React.createElement(Main, {data: "json/column/column.json"}), mainNode);
