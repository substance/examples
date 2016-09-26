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
    editor.outlet('tools').append(
      // $$(SessionDumpTool, { session: this.session }),
      // $$(ToggleConnectionTool, { session: this.session })
    );
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

// function SessionDumpTool() {
//   SessionDumpTool.super.apply(this, arguments);
// }

// SessionDumpTool.Prototype = function() {

//   this.render = function($$) {
//     var el = $$('div')
//       .attr('title', 'Dump Session message log')
//       .addClass('se-tool')
//       .append(
//         $$('button')
//           .append($$(Icon, {icon: 'fa-tasks'}))
//           .on('click', this.onClick)
//       );
//     return el;
//   };

// };

// Component.extend(SessionDumpTool);

// function ToggleConnectionTool() {
//   ToggleConnectionTool.super.apply(this, arguments);
// }

// ToggleConnectionTool.Prototype = function() {

//   this.didMount = function() {
//     this.session = this.props.session;
//     this.session.on('connected', this._onConnected, this);
//     this.session.on('disconnected', this._onDisconnected, this);
//   };

//   this._onConnected = function() {
//     this.setState({
//       connected: true
//     });
//   };

//   this._onDisconnected = function() {
//     this.setState({
//       connected: false
//     });
//   };

//   this.dispose = function() {
//     this.session.off(this);
//   };

//   this.getInitialState = function() {
//     return {
//       connected: true
//     };
//   };

//   this.render = function($$) {
//     var el = $$('div')
//       .attr('title', this.state.connected ? 'Disconnect': 'Connect (aka sync)')
//       .addClass('se-tool')
//       .append(
//         $$('button').addClass('se-debug')
//           .append($$(Icon, {
//             icon: this.state.connected ? 'fa-toggle-on' : 'fa-toggle-off'
//           }), ' Connected')
//           .on('click', this.onClick)
//       );
//     return el;
//   };

//   this.onClick = function() {
//     var connected = this.state.connected;
//     if (connected) {
//       this.props.session.disconnect();
//     } else {
//       this.props.session.sync();
//     }
//   };
// };

// Component.extend(ToggleConnectionTool);



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
