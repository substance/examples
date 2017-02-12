import { InlineNodeComponent, TextPropertyEditor } from 'substance'

class ExpressionComponent extends InlineNodeComponent {

  didMount() {
    super.didMount()

    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [this.props.node.id, 'value']
    })

    // HACK: we are patching the rendered element
    // by looking at the selection, and if there is an
    // expression pointing to us, we enable highlighting
    // TODO: this should be part of _deriveStateFromSelection
    this.context.editorSession.onPostRender('selection', this.onSelectionChanged, this);

    // HACK: we use node and document as event channel
    let node = this.props.node
    node.on('toggle:showSource', this.toggleShowSource, this)
    node.getDocument().on('expression:update', this.rerender, this)
  }

  dispose() {
    super.dispose()

    this.context.editorSession.off(this)

    let node = this.props.node
    node.off(this)
    node.getDocument().off(this)
  }

  render($$) {
    let el = super.render($$)
    el.addClass('sc-expression');

    const node = this.props.node;
    if (this.state.showSource) {
      el.addClass('sm-show-source');
    } else {
      el.addClass('sm-inline');
      if (node.variable) {
        el.addClass('sm-variable');
      }
    }
    return el;
  }

  renderContent($$) {
    const node = this.props.node;
    let el = $$('span')
    if (this.state.showSource) {
      el.append(
        $$(TextPropertyEditor, {
          disabled: this.props.disabled,
          tagName: 'span',
          path: [node.id, 'value'],
          withoutBreak: true
        }).ref('editor')
      )
      el.append(
        $$('button').ref('close-button')
          .addClass('se-confirm-value')
          .attr('contenteditable', false)
          .append(this.context.iconProvider.renderIcon($$, 'confirm-value'))
          .on('mousedown', this.confirmValue)
      )
    } else {
      el.append(
        node.getDisplayValue()
      )
    }
    return el
  }

  confirmValue() {
    this.extendState({ showSource: false });
    this.selectNode()
  }

  toggleShowSource() {
    this.extendState({ showSource:!this.state.showSource });
  }

  onSelectionChanged() {
    let selectionState = this.context.editorSession.getSelectionState()
    let annos = selectionState.getAnnotationsForType('expression-reference');
    if (annos.length === 1 && annos[0].expressionId === this.props.node.id) {
      this.el.addClass('sm-highlighted');
    } else {
      this.el.removeClass('sm-highlighted');
    }
  }
}

export default ExpressionComponent
