var Main = require('../Main.react.js'),
    InformationComponent = require('./InformationComponent.react.js'),
    mainNode = document.getElementById('main');
    components = {
      "InformationComponentClub": InformationComponent.InformationComponentClub,
      "InformationComponentNew": InformationComponent.InformationComponentNew
    };

React.render(<Main data="json/information/information.json" components={ components }/>, mainNode);
