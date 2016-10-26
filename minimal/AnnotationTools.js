import TextTools from './TextTools'

/*
  A default implementation to render the content for the overlay (aka popup) tools.
*/
class AnnotationTools extends TextTools {

  getActiveToolGroupNames() {
    return ['annotations']
  }

  _position(hints) {
    if (this.hasActiveTools()) {
      this.el.removeClass('sm-hidden')
      if (hints) {
        let contentWidth = this.el.htmlProp('offsetWidth')
        let selRect = hints.selectionRect
        let innerContentRect = hints.innerContentRect

        // By default, gutter is centered (y-axis) and left of the scrollPane content (x-axis)
        this.el.css('top', selRect.top + selRect.height - selRect.height / 2)
        // left align to the right gutter
        this.el.css('left', hints.contentWidth - innerContentRect.right)
      }
    } else {
      this.el.addClass('sm-hidden')
    }
  }

}

export default AnnotationTools
