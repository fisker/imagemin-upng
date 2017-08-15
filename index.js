'use strict';

var isPng = require('is-png');
var upng = require('upng-js');

module.exports = function(opts) {
	opts = Object.assign({cnum: 256}, opts);

  return function(buf) {
    if (!Buffer.isBuffer(buf)) {
      return Promise.reject(new TypeError('Expected a buffer'));
    }

    if (!isPng(buf)) {
      return Promise.resolve(buf);
    }

    var oriImg  = upng.decode(buf);
    var oriRGBA = upng.toRGBA8(oriImg).buffer;

    var comArrayBuff = upng.encode(oriRGBA, oriImg.width, oriImg.height, opts.cnum);
    var comBuffer = Buffer.from(comArrayBuff)

    return Promise.resolve(comBuffer);
  };
};
