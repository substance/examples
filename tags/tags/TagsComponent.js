var AnnotationComponent = require('substance/ui/AnnotationComponent');

function TagsComponent() {
  TagsComponent.super.apply(this, arguments);
}

AnnotationComponent.extend(TagsComponent, function TagsComponentPrototype() {
  this.render = function() {
    var el = AnnotationComponent.prototype.render.call(this);

    return el;
  };

  this.didMount = function() {
    AnnotationComponent.prototype.didMount.call(this);
    var node = this.props.node;
    this.doc = node.getDocument();
    this.doc.getEventProxy('path').connect(this, [node.id, 'tags'], this.rerender);
  };

  this.dispose = function() {
    AnnotationComponent.prototype.dispose.call(this);
    this.doc.getEventProxy('path').disconnect(this);
  };
});

module.exports = TagsComponent;