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
    return "";
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
    return (
      React.createElement("div", {className:  cssClass }, 
        React.createElement("h1", null,  contentObject )
      )
    )
  } else if (headerType === "subtitle") {
    return (
      React.createElement("div", {className:  cssClass }, 
        React.createElement("h2", null,  contentObject )
      )
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
