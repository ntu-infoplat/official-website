var Main = require('../Main.react.js'),
    ColumnComponent = require('./columnComponent.js'),
    mainNode = document.getElementById('main'),
    components = { "ColumnComponent": ColumnComponent };

React.render(<Main data="json/column/column.json" components={ components }/>, mainNode);
