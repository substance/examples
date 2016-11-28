import { Component, CollabClient, TestCollabSession, ProseEditor, twoParagraphs } from 'substance'

class Client extends Component {
  constructor(...args) {
    super(...args)

    let configurator = this.context.configurator

    this.doc = configurator.createArticle(twoParagraphs)

    if (!this.props.connection) {
      throw new Error("'connection' is required.");
    }

    this.collabClient = new CollabClient({
      connection: this.props.connection
    });

    // CollabSession expects a connected and authenticated collabClient
    this.session = new TestCollabSession(this.doc, {
      id: this.props.userId,
      configurator: configurator,
      collabClient: this.collabClient,
      documentId: 'test-doc',
      version: 0,
      logging: true,
      autoSync: true,
      debug: this.props.debug
    });
  }

  didMount() {
    this.refs.editor.refs.body.selectFirst();
  }

  render($$) {
    var el = $$('div').addClass('sc-client').addClass('sm-'+this.props.userId);
    var editor = $$(ProseEditor, {
      disabled: this.props.disabled,
      editorSession: this.session
    }).ref('editor');
    if (this.props.disabled) {
      el.append(
        $$('div').addClass('se-blocker')
          .on('mousedown', this.onMousedown)
      );
    }
    el.append(editor)
    return el
  }

  onMousedown(e) {
    e.stopPropagation()
    e.preventDefault()
    this.send('switchUser', this.props.userId)
  }
}

export default Client