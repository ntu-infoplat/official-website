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
        content = getContent(data.content);

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
    return "";
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
    return (
      <div className={ cssClass }>
        <h1>{ contentObject }</h1>
      </div>
    )
  } else if (headerType === "subtitle") {
    return (
      <div className={ cssClass }>
        <h2>{ contentObject }</h2>
      </div>
    )
  }
}

function getContent(content) {
  if (content === undefined) {
    return "";
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
        contentObject = <img src={ content } alt={ description }></img>;
      }

      if (type === 'text') {
        contentObject = <p dangerouslySetInnerHTML={{__html: content}}></p>;
      }

      if (type === 'video') {
        contentObject = <iframe src={ content } frameborder="0" allowfullscreen></iframe>;
      }

      return (
        <div key={ i } className={ cssClass }>
          { contentObject }
        </div>
      );
    }

  })
}

module.exports = ContentBlock;
