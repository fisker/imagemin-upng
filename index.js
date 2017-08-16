'use strict';

var isPng = require('is-png');
var UPNG = require('upng-js');

module.exports = function(opts) {
	opts = Object.assign({cnum: 256}, opts);

  return function(buf) {
    if (!Buffer.isBuffer(buf)) {
      return Promise.reject(new TypeError('Expected a buffer'));
    }

    if (!isPng(buf)) {
      return Promise.resolve(buf);
    }

    var oriImg = UPNG.decode(buf);
    var oriRGBA = UPNG.toRGBA8(oriImg);

    var comArrayBuff = UPNG.encode(oriRGBA, oriImg.width, oriImg.height, opts.cnum);
    var comBuffer = Buffer.from(comArrayBuff);

    return Promise.resolve(comBuffer);
  };
};
