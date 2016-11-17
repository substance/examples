import { Toolbox } from 'substance'

/*
  A default implementation to render the content for the overlay (aka popup) tools.
*/
class TextTools extends Toolbox {

  didMount() {
    super.didMount()
    this.context.scrollPane.on('dom-selection:rendered', this._position, this)
  }

  dispose() {
    super.dispose()
    this.context.scrollPane.off(this)
  }

  render($$) {
    let el = $$('div').addClass(this.getClassNames())
    el.addClass('sm-hidden')
    el.addClass('sm-theme-'+this.getTheme())
    let activeToolGroups = this.state.activeToolGroups
    let activeToolsEl = $$('div').addClass('se-active-tools')

    activeToolGroups.forEach((toolGroup) => {
      let toolGroupProps = Object.assign({}, toolGroup, {
        toolStyle: this.getToolStyle(),
        showIcons: true
      })
      activeToolsEl.append(
        $$(toolGroup.Class, toolGroupProps)
      )
    })
    el.append(activeToolsEl)
    return el
  }

  hide() {
    this.el.addClass('sm-hidden')
  }

  /*
    Update and re-position
  */
  _position(hints) {
    if (this.hasActiveTools()) {
      this.el.removeClass('sm-hidden')
      if (hints) {
        let selRect = hints.selectionRect

        // By default, gutter is centered (y-axis) and left of the scrollPane content (x-axis)
        this.el.css('top', selRect.top + selRect.height - selRect.height / 2)
        // Right align to the gutter
        this.el.css('left', 20)
      }
    } else {
      this.el.addClass('sm-hidden')
    }
  }

  /*
    Override if you just want to use a different style
  */
  getToolStyle() {
    return 'outline'
  }

  getClassNames() {
    return 'sc-text-tools'
  }

  getTheme() {
    return 'dark'
  }

  getActiveToolGroupNames() {
    return ['text']
  }

}

export default TextTools
