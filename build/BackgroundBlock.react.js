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

    console.log(backgroundColorStyle);
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

          console.log(subComponent);
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
