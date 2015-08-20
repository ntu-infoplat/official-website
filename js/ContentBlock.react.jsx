var ContentBlock = React.createClass({
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
      <div className="content-wrapper">
        <div className="header">
          {header}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
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
    contentObject = <img src={ content } alt={ description }></img>;
  }

  if (type === "text") {
    contentObject = content;
  }

  if (headerType === "title") {
    console.log(cssClass);
    return <h1 className={ cssClass }>{ contentObject }</h1>;
  } else if (headerType === "subtitle") {
    return <h2 className={ cssClass }>{ contentObject }</h2>;
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
        contentObject = <img src={ content } alt={ description }></img>;
      }

      if (type === 'text') {
        contentObject = <p dangerouslySetInnerHTML={{__html: content}}></p>;
      }

      if (type === 'video') {
        contentObject = <iframe src={ content } frameborder="0" allowfullscreen></iframe>;
      }

      if (type === 'component') {
        var Component = this.props.components[content];
        if (Component) {
          contentObject = <Component />;
        } else {
          contentObject = undefined;
        }
      }

      return (
        <div key={ i } className={ cssClass }>
          { contentObject }
        </div>
      );
    }
  }.bind(self));
}

module.exports = ContentBlock;
