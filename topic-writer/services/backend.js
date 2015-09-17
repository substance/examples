var Substance = require("substance");
var Topic = require('../article');

var TEST_DOCUMENT = [
  '<p>Linz (/ˈlɪnts/; German pronunciation: [ˈlɪnt͡s]; Czech: Linec) is the third-largest city of Austria and capital of the state of Upper Austria (German: Oberösterreich). It is located in the north centre of Austria, approximately 30 kilometres (19 miles) south of the Czech border, on both sides of the River Danube. The population of the city is 193,814, and that of the Greater Linz conurbation is about 271,000. In 2009 Linz, together with the Lithuanian capital Vilnius, was chosen as the European Capital of Culture. Since December 1, 2014 Linz is a member of the UNESCO Creative Cities (UCCN) network as a City of Media Arts. Cities receive this title for enriching the urban lifestyle through the sponsorship and successful integration of media art and involving society in these electronic art forms.[2] Linz is well known for the Linzer torte, which is said to be the oldest cake in the world, with its first recipe dating from 1653.</p>',
  '<h1>Heading 1</h1>',
  '<p>Lorem ipsum with a <a href="http://substance.io">link</a>.</p>',
  '<h2>Heading 2</h2>'
].join('\n');

var AVAILABLE_TOPICS = [
  {
    "id": "topic_austria",
    "type": "country",
    "name": "Austria",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Austria"
  },
  {
    "id": "topic_river_danube",
    "type": "river",
    "name": "Danube",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/River_Danube"
  },

  {
    "id": "topic_linzer_torte",
    "type": "food",
    "name": "Linzer Torte",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Linzer_torte"
  }
];

var Backend = function() {

};

Backend.Prototype = function() {

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    $.ajax({
      url: "./data/linz.xml",
      dataType: 'xml',
      success: function(xml) {
        var doc = new Topic();
        doc.load(xml);
        window.doc = doc;
        cb(null, doc);
      },
      error: function(err) {
        console.error(err.responseText);
        cb(err.responseText);
      }
    });
  };

  this.saveDocument = function(doc, cb) {
    cb('Not supported in dev version');
  };

  this.getTopics = function(cb) {
    cb(null, AVAILABLE_TOPICS);
  };
};

Substance.initClass(Backend);

module.exports = Backend;