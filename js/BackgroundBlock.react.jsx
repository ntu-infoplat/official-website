var BackgroundBlock = React.createClass({
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
      <div className="background-wrapper">
        <BackgroundBlockStyle data={ data.background } />
        <BackgroundBlockComponent data={ data.component } />
      </div>
    )
  }
});

var BackgroundBlockStyle = React.createClass({
  render: function () {
    var background = this.props.data,
        backgroundColorStyle = undefined,
        backgroundObject;

    if (background.type === 'color' && typeof background.content === 'string') {
      backgroundColorStyle = { 'background-color': background.content };
      backgroundObject = "";
    } else {
      if (typeof background.content === 'string') {
        backgroundObject = <img src = { background.content }></img>
      } else {
        backgroundObject = background.content.map(function (src, i) {
          return <img key={ i } src={ src.url }></img>
        });
      }
    }

    return (
      <div className="background" style={ backgroundColorStyle ? backgroundColorStyle : {} }>
        { backgroundObject }
      </div>
    )
  }
});

var BackgroundBlockComponent = React.createClass({
  render: function () {
    var component = this.props.data,
        componentObject,

    componentObject = component.map(function (component, i) {
      var componentContent = undefined,
          subComponentObject = undefined;

      if (component.type === 'image') {
        componentContent = <img src={ component.content } alt={ component.description }></img>;
      } else if (component.type === 'text') {
        componentContent = <p>{ component.content }</p>;
      }

      if (component.children.length > 0) {
        subComponentObject = component.children.map(function (child, i) {
          var i,
              length = child.repeat || 1;
              subComponent = [],
              subComponentContent = undefined;

          for (i = 0; i < length; i += 1) {
            if (child.type === 'image'){
              subComponentContent = <img src={ child.content } alt={ child.description } />;
            } else if (child.type === 'text') {
              subComponentContent = <p>{ child.content }</p>;
            } else {
              subComponentContent = undefined;
            }

            subComponentContent = <div key={ i } className={ child.cssClass }>{ subComponentContent }</div>;
            subComponent.push(subComponentContent);
          }
          return subComponent
        })
      }

      return (
        <div key={ i } className={ component.cssClass }>
          { componentContent }
          { subComponentObject }
        </div>
      )
    })

    return (
      <div className="component">
        { componentObject }
      </div>
    )
  }
});

module.exports = BackgroundBlock ;
