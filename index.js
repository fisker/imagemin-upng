'use strict'

var UPNG = require('upng-js')
var isPng = require('is-png')

module.exports = function(options) {
  options = Object.assign({cnum: 256}, options)

  return function(input) {
    if (!Buffer.isBuffer(input)) {
      return Promise.reject(new TypeError('Expected a buffer'))
    }

    if (!isPng(input)) {
      return Promise.resolve(input)
    }

    var img = UPNG.decode(input)
    var dels = img.frames.map(function(frame) {
      return frame.delay
    })
    var rgba = UPNG.toRGBA8(img)

    var buffer = Buffer.from(
      UPNG.encode(rgba, img.width, img.height, options.cnum, dels)
    )

    return Promise.resolve(
      buffer.byteLength < input.byteLength ? buffer : input
    )
  }
}
