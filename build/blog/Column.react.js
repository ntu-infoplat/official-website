var Main = require('../Main.react.js'),
    ColumnComponent = require('./ColumnComponent.react.js'),
    mainNode = document.getElementById('main'),
    components = { "ColumnComponent": ColumnComponent };

React.render(React.createElement(Main, {data: "json/column/column.json", components:  components }), mainNode);
