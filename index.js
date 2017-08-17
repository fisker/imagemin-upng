'use strict';

var isPng = require('is-png');
var UPNG = require('upng-js');

module.exports = function(options) {
  options = Object.assign({cnum: 256}, options);

  return function(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      return Promise.reject(new TypeError('Expected a buffer'));
    }

    if (!isPng(buffer)) {
      return Promise.resolve(buffer);
    }

    var img = UPNG.decode(buffer);
    var rgba = UPNG.toRGBA8(img);

    var newBuffer = Buffer.from(UPNG.encode(rgba, img.width, img.height, options.cnum));

    return Promise.resolve(newBuffer.byteLength < buffer.byteLength ? newBuffer : buffer);
  };
};
