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
        content = getContent(data.content);

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
    return React.createElement("h1", {className:  cssClass },  contentObject );
  } else if (headerType === "subtitle") {
    return React.createElement("h2", {className:  cssClass },  contentObject );
  }
}

function getContent(content) {
  if (content === undefined) {
    return undefined;
  }

  var property, type, content, cssClass, description;

  return content.map(function (contentUnit, i) {
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

      return (
        React.createElement("div", {key:  i, className:  cssClass }, 
           contentObject 
        )
      );
    }

  })
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
        mainSection;

    mainSection = data.map(function (section, i) {
      var sectionId = section.id,
          sectionClass = section.cssClass,
          background = section['background-data'],
          content = section['content-data'];

      return (
        React.createElement("section", {key:  i, id:  sectionId, className:  sectionClass }, 
          React.createElement(BackgroundBlock, {data:  background }), 
          React.createElement(ContentBlock, {data:  content })
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
    mainNode = document.getElementById('main');

React.render(React.createElement(Main, {data: "json/index/index.json"}), mainNode);

},{"../Main.react.js":3}]},{},[4]);
