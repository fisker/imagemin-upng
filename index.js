'use strict'

var UPNG = require('upng-js')
var isPng = require('is-png')
var defaultOptions = {
  cnum: 256
}

module.exports = function(options) {
  options = Object.assign({}, defaultOptions, options)

  return function(input) {
    if (!Buffer.isBuffer(input)) {
      return Promise.reject(new TypeError('Expected a buffer'))
    }

    if (!isPng(input)) {
      return Promise.resolve(input)
    }

    var img = UPNG.decode(input)

    var output = Buffer.from(
      UPNG.encode(
        UPNG.toRGBA8(img),
        img.width,
        img.height,
        options.cnum,
        img.frames.map(function(frame) {
          return frame.delay
        })
      )
    )

    return Promise.resolve(output)
  }
}
