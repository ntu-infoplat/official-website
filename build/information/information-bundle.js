(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BackgroundBlock = React.createClass({displayName: "BackgroundBlock",
  /**
   *  data: {
   *    background: {
   *      type: String ('image', 'color')
   *      content: Array[String] (image src / color) ['src': 'url']
   *    }
   *    component: [
   *      {
   *        type: String ('empty', 'image', 'text')
   *        content: String
   *        cssClass: String
   *        description: String
   *        children: Array [
   *          {
   *            type: String ('empty', 'image', 'text')
   *            content: String
   *            cssClass: String
   *            description: String
   *            repeat: int
   *          }
   *        ]
   *      },
   *      ...
   *    ]
   *  }
   */
  render: function () {
    var data = this.props.data;

    return (
      React.createElement("div", {className: "background-wrapper"}, 
        React.createElement(BackgroundBlockStyle, {data:  data.background}), 
        React.createElement(BackgroundBlockComponent, {data:  data.component})
      )
    )
  }
});

var BackgroundBlockStyle = React.createClass({displayName: "BackgroundBlockStyle",
  render: function () {
    var background = this.props.data,
        backgroundColorStyle = undefined,
        backgroundObject;

    if (background.type === 'color' && typeof background.content === 'string') {
      backgroundColorStyle = { 'background-color': background.content };
      backgroundObject = "";
    } else {
      if (typeof background.content === 'string') {
        backgroundObject = React.createElement("img", {src:  background.content})
      } else {
        backgroundObject = background.content.map(function (src, i) {
          return React.createElement("img", {key:  i, src:  src.url})
        });
      }
    }

    return (
      React.createElement("div", {className: "background", style:  backgroundColorStyle ? backgroundColorStyle : {}}, 
         backgroundObject 
      )
    )
  }
});

var BackgroundBlockComponent = React.createClass({displayName: "BackgroundBlockComponent",
  render: function () {
    var component = this.props.data,
        componentObject,

    componentObject = component.map(function (component, i) {
      var componentContent = undefined,
          subComponentObject = undefined;

      if (component.type === 'image') {
        componentContent = React.createElement("img", {src:  component.content, alt:  component.description});
      } else if (component.type === 'text') {
        componentContent = React.createElement("p", null,  component.content);
      }

      if (component.children.length > 0) {
        subComponentObject = component.children.map(function (child, i) {
          var i,
              length = child.repeat || 1;
              subComponent = [],
              subComponentContent = undefined;

          for (i = 0; i < length; i += 1) {
            if (child.type === 'image'){
              subComponentContent = React.createElement("img", {src:  child.content, alt:  child.description});
            } else if (child.type === 'text') {
              subComponentContent = React.createElement("p", null,  child.content);
            } else {
              subComponentContent = undefined;
            }

            subComponentContent = React.createElement("div", {key:  i, className:  child.cssClass},  subComponentContent );
            subComponent.push(subComponentContent);
          }
          return subComponent
        })
      }

      return (
        React.createElement("div", {key:  i, className:  component.cssClass}, 
           componentContent, 
           subComponentObject 
        )
      )
    })

    return (
      React.createElement("div", {className: "component"}, 
         componentObject 
      )
    )
  }
});

module.exports = BackgroundBlock ;

},{}],2:[function(require,module,exports){
var ContentBlock = React.createClass({displayName: "ContentBlock",
  /**
   *  data: {
   *    header: {
   *      type: String ('image', 'text')
   *      content: String
   *      cssClass: String
   *      description: String
   *    }
   *    content: [
   *      {
   *        property: String ('title', 'subtitle', 'content')
   *        type: String ('image', 'text', 'video', 'component')
   *        content: String
   *        cssClass: String
   *        description: String
   *        children: [
   *
   *        ]
   *      },
   *      ...
   *    ]
   *  }
   */
  render: function () {
    var data = this.props.data,
        header = getHeader(data.header),
        content = getContent.call(this, data.content);

    return (
      React.createElement("div", {className: "content-wrapper"}, 
        React.createElement("div", {className: "header"}, 
          header
        ), 
        React.createElement("div", {className: "content"}, 
          content
        )
      )
    )
  }
});

function getHeader(header, headerType) {
  if (header === undefined) {
    return undefined;
  }

  var headerType = headerType || "title",
      type = header.type,
      content = header.content,
      cssClass = header.cssClass || "",
      description = header.description,
      contentObject;

  if (type === "image") {
    contentObject = React.createElement("img", {src:  content, alt:  description });
  }

  if (type === "text") {
    contentObject = content;
  }

  if (headerType === "title") {
    console.log(cssClass);
    return React.createElement("h1", {className:  cssClass },  contentObject );
  } else if (headerType === "subtitle") {
    return React.createElement("h2", {className:  cssClass },  contentObject );
  }
}

function getContent(content) {
  if (content === undefined) {
    return undefined;
  }

  var self = this,
      property, type, content, cssClass, description;

  return content.map(function (contentUnit, i) {
    console.log(contentUnit);
    property = contentUnit.property;
    type = contentUnit.type;
    content = contentUnit.content;
    cssClass = contentUnit.cssClass || "";
    description = contentUnit.description;

    var contentObject;

    if (property === 'title' || property === 'subtitle') {

      var header = {
        type: type,
        content: content,
        cssClass: cssClass,
        description: description
      }

      return getHeader(header, property);

    } else {

      if (type === 'image') {
        contentObject = React.createElement("img", {src:  content, alt:  description });
      }

      if (type === 'text') {
        contentObject = React.createElement("p", {dangerouslySetInnerHTML: {__html: content}});
      }

      if (type === 'video') {
        contentObject = React.createElement("iframe", {src:  content, frameborder: "0", allowfullscreen: true});
      }

      if (type === 'component') {
        var Component = this.props.components[content];
        if (Component) {
          contentObject = React.createElement(Component, null);
        } else {
          contentObject = undefined;
        }
      }

      return (
        React.createElement("div", {key:  i, className:  cssClass }, 
           contentObject 
        )
      );
    }
  }.bind(self));
}

module.exports = ContentBlock;

},{}],3:[function(require,module,exports){
var ContentBlock = require('./ContentBlock.react.js'),
    BackgroundBlock = require('./BackgroundBlock.react.js');

var Main = React.createClass({displayName: "Main",
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: this.props.data,
        dataType: 'json',
        success: function(data) {
          this.setState({ data: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.data, status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data,
        components = this.props.components,
        mainSection;

    mainSection = data.map(function (section, i) {
      var sectionId = section.id,
          sectionClass = section.cssClass,
          background = section['background-data'],
          content = section['content-data'];

      return (
        React.createElement("section", {key:  i, id:  sectionId, className:  sectionClass }, 
          React.createElement(BackgroundBlock, {data:  background }), 
          React.createElement(ContentBlock, {data:  content, components:  components })
        )
      )
    });

    return (
      React.createElement("div", {className: "main"}, 
         mainSection 
      )
    )
  }
});

module.exports = Main ;

},{"./BackgroundBlock.react.js":1,"./ContentBlock.react.js":2}],4:[function(require,module,exports){
var Main = require('../Main.react.js'),
    InformationComponent = require('./InformationComponent.react.js'),
    mainNode = document.getElementById('main');
    components = {
      "InformationComponentClub": InformationComponent.InformationComponentClub,
      "InformationComponentNew": InformationComponent.InformationComponentNew
    };

React.render(React.createElement(Main, {data: "json/information/information.json", components:  components }), mainNode);

},{"../Main.react.js":3,"./InformationComponent.react.js":5}],5:[function(require,module,exports){
var InformationComponentClub = React.createClass({displayName: "InformationComponentClub",
  /**
   *  data: [
   *    {
   *      background: {
   *        type: String ('image')
   *        content: Array[String] (image src / color) ['src': 'url']
   *      },
   *      content: {
   *        header: String
   *        content: String
   *      }
   *    }
   *    ...
   *  ]
   */
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: "json/information/informationComponentClub.json",
        dataType: 'json',
        success: function(data) {
          this.setState({ data: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data,
        informationClubBackground,
        informationClubContent,
        informationComponentClubObject;

    informationComponentClubObject = data.map(function (informationClub, i) {
      informationClubBackground = informationClub.background;
      informationClubContent = informationClub.content;
      var informationClubBackgroundStyle = {
        "backgroundImage": "url(" + informationClubBackground.content + ")"
      };
      return (
        React.createElement("div", {className: "information-club"}, 
          React.createElement("div", {className: "information-club-background-wrapper", style:  informationClubBackgroundStyle }), 
          React.createElement("div", {className: "information-club-content-wrapper horizontal-vertical-center"}, 
            React.createElement("div", {className: "information-club-content"}, 
              React.createElement("div", {className: "information-club-topic"}, 
                React.createElement("h2", null,  informationClubContent.header)
              ), 
              React.createElement("div", {className: "information-club-description"}, 
                 informationClubContent.content
              )
            )
          )
        )
      )
    })

    return (
      React.createElement("div", {className: "information-club-wrapper"}, 
         informationComponentClubObject 
      )
    )
  }
});

var InformationComponentNew = React.createClass({displayName: "InformationComponentNew",
  /**
   *  data: [
   *    {
   *      header: String
   *      content: String
   *    }
   *    ...
   *  ]
   */
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    $.ajax({
        url: "json/information/informationComponentNew.json",
        dataType: 'json',
        success: function(data) {
          this.setState({ data: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }.bind(this)
    });
  },
  render: function () {
    var data = this.state.data,
        informationComponentNewObject;

    informationComponentNewObject = data.map(function (informationNew, i) {
      return (
        React.createElement("div", {className: "information-new vertical-center"}, 
          React.createElement("div", {className: "information-new-header"}, 
             informationNew.header
          ), 
          React.createElement("div", {className: "information-new-content"}, 
            React.createElement("a", {href:  informationNew.content},  informationNew.content)
          )
        )
      )
    })

    return (
      React.createElement("div", {className: "information-new-wrapper"}, 
         informationComponentNewObject 
      )
    )
  }
});

module.exports = {
  "InformationComponentClub": InformationComponentClub,
  "InformationComponentNew": InformationComponentNew
};

},{}]},{},[4]);
