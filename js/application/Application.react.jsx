var Main = require('../Main.react.js'),
    ApplicationComponent = require('./ApplicationComponent.react.js'),
    mainNode = document.getElementById('main'),
    components = { "ApplicationComponent": ApplicationComponent };

React.render(<Main data="json/application/application.json" components={ components }/>, mainNode);
