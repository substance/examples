const {
  Component, SplitPane, twoParagraphs, MessageQueue, TestWebSocketServer,
  TestWebSocketConnection, TestCollabServer, DocumentEngine, DocumentStore,
  ChangeStore, documentStoreSeed, changeStoreSeed, createTestDocumentFactory,
  ProseEditorConfigurator, ProseEditorPackage, Surface, CollabClient,
  TestCollabSession, ProseEditor
} = substance

const collabWriterConfig = {
  name: 'collab-writer',
  configure: function(config) {
    config.import(ProseEditorPackage)
    // TODO: Add custom tools
    // config.addTool...
  }
}

var configurator = new ProseEditorConfigurator().import(collabWriterConfig)

// this flag prevents competing updates of DOM selections
// which is only necessary in this example, where we host two
// clients in one DOM
Surface.MULTIPLE_APPS_ON_PAGE = true;

class Client extends Component {
  constructor(...args) {
    super(...args)

    this.doc = configurator.createArticle(twoParagraphs)

    if (!this.props.connection) {
      throw new Error("'connection' is required.");
    }

    this.collabClient = new CollabClient({
      connection: this.props.connection
    });

    this.doc = configurator.createArticle(twoParagraphs)

    // CollabSession expects a connected and authenticated collabClient
    this.session = new TestCollabSession(this.doc, {
      collabClient: this.collabClient,
      documentId: 'test-doc',
      version: 1,
      logging: true,
      autoSync: true
    });
  }

  didMount() {
    this.refs.editor.refs.body.selectFirst();
  }

  render($$) {
    var el = $$('div').addClass('sc-client').addClass('sm-'+this.props.userId);
    var editor = $$(ProseEditor, {
      disabled: this.props.disabled,
      documentSession: this.session,
      configurator: configurator,
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

/*
  App
*/
class App extends Component {

  constructor(...args) {
    super(...args)

    this.documentStore = new DocumentStore().seed(documentStoreSeed)
    this.changeStore = new ChangeStore().seed(changeStoreSeed)
    this.documentEngine = new DocumentEngine({
      documentStore: this.documentStore,
      changeStore: this.changeStore,
      schemas: {
        'prose-article': {
          name: 'prose-article',
          version: '1.0.0',
          documentFactory: createTestDocumentFactory(twoParagraphs)
        }
      }
    })

    this.messageQueue = new MessageQueue()
    this.wss = new TestWebSocketServer({
      messageQueue: this.messageQueue,
      serverId: 'hub'
    })
    this.collabServer = new TestCollabServer({
      documentEngine: this.documentEngine
    })
    this.collabServer.bind(this.wss);

    this.conn1 = new TestWebSocketConnection({
      messageQueue: this.messageQueue,
      clientId: 'user1',
      serverId: 'hub',
    })
    this.conn2 = new TestWebSocketConnection({
      messageQueue: this.messageQueue,
      clientId: 'user2',
      serverId: 'hub'
    })

    this.messageQueue.flush()
    this.messageQueue.start()
    this.handleAction('switchUser', this.switchUser)
  }

  render($$) {
    var el = $$('div').addClass('sc-two-editors')
    el.append(
      $$(SplitPane, {
        splitType: 'vertical',
        sizeA: '50%'
      }).append(
        $$(Client, {
          userId: 'user1',
          connection: this.conn1
        }).ref('user1'),
        $$(Client, {
          userId: 'user2',
          connection: this.conn2,
          disabled: true
        }).ref('user2')
      )
    )
    return el;
  }

  // enables the editor for user1 and disables the other
  // Note: being in one DOM it doesn't work to have two
  // active editors at the same time
  switchUser(userId) {
    if (userId === 'user1') {
      this.refs.user1.extendProps({ disabled: false })
      this.refs.user2.extendProps({ disabled: true })
    } else if (userId === 'user2') {
      this.refs.user1.extendProps({ disabled: true })
      this.refs.user2.extendProps({ disabled: false })
    }
  }
}

window.onload = function() {
  App.mount({}, document.body)
}
