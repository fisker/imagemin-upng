'use strict';

var isPng = require('is-png');
var upng = require('upng-js');

module.exports = function(opts) {
  opts = opts || {};
  
  return function(buf) {
    if (!Buffer.isBuffer(buf)) {
      return Promise.reject(new TypeError('Expected a buffer'));
    }

    if (!isPng(buf)) {
      return Promise.resolve(buf);
    }

    var cnum = opts.cnum;
    if (isNaN(cnum)) {
      cnum = 256;
    }

    var oriImg  = upng.decode(buf);
    var oriRGBA = upng.toRGBA8(oriImg).buffer;

    var comArrayBuff = upng.encode(oriRGBA, oriImg.width, oriImg.height, opts.cnum);

    return Promise.resolve(Buffer.from(comArrayBuff));
  };
};