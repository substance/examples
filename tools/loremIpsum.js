'use strict';

var createDocumentFactory = require('substance/model/createDocumentFactory');
var ProseArticle = require('substance/packages/prose-editor/ProseArticle');

module.exports = createDocumentFactory(ProseArticle, function(tx) {
  var body = tx.get('body');
  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed velit quis dui laoreet interdum at interdum lectus. Nullam eleifend velit nisi, eget semper sem gravida vitae. Pellentesque lacus massa, elementum sed dictum id, elementum in ante. Maecenas ac nibh non tortor fringilla egestas. Ut molestie semper sapien, nec pellentesque diam accumsan at. Aenean auctor facilisis ante, eget accumsan nibh posuere eu. Phasellus quis ipsum eget mauris eleifend fermentum sollicitudin ut orci. Curabitur at lacinia enim. Nam leo felis, rhoncus id mattis non, semper vel ante. Etiam posuere felis neque, vitae pulvinar dui venenatis at. Maecenas id fermentum risus. Pellentesque malesuada mollis ligula, a vulputate ligula lobortis non. Aliquam tristique nunc augue. Ut vitae enim lectus. Aliquam posuere est massa, quis suscipit orci vulputate id.'
  });
  body.show('p1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: 'Aenean viverra dolor nibh, vel venenatis quam varius sed. Cras sagittis ac enim id finibus. In maximus lorem libero, a interdum lorem venenatis ut. Vivamus mi justo, maximus a vulputate in, faucibus hendrerit lorem. Maecenas tincidunt semper felis et ornare. Nullam hendrerit eget urna vitae iaculis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc in odio a augue pulvinar semper vel vel ante. Donec mollis tortor et tellus pellentesque sollicitudin. Phasellus sit amet ipsum vel velit pellentesque lobortis. Vestibulum nec arcu ac est rutrum gravida. Etiam hendrerit ante vel lectus tempus tempus. Sed gravida diam quis erat facilisis consectetur. Proin sed gravida nulla. Morbi eu lobortis orci.'
  });
  body.show('p2');

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi tellus metus, tristique in justo non, tincidunt porttitor mauris. Vestibulum hendrerit lacinia velit vitae pharetra. Morbi tempus sem in tincidunt porttitor. Cras at odio ut purus hendrerit pharetra sed et elit. Cras ac tempus urna. Cras accumsan porttitor purus, nec condimentum ex consequat nec. Praesent nec libero arcu. In elementum elementum odio a imperdiet. Proin tempor purus velit, nec fermentum leo placerat id. Aliquam placerat condimentum dolor quis fringilla. Vivamus finibus felis ut justo ornare, sollicitudin hendrerit elit mattis.'
  });
  body.show('p3');

  tx.create({
    id: 'l1',
    type: 'link',
    path: ['p3', 'content'],
    url: 'http://example.com',
    startOffset: 20,
    endOffset: 40
  });
});