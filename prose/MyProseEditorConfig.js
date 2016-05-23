var ImagePackage = require('substance/packages/image/ImagePackage');

module.exports = function(config) {
  config.import(ImagePackage, {icon: 'fa-image'});
};
