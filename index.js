const UPNG = require('upng-js')
const isPng = require('is-png')

const defaults = {
  cnum: 256,
}

function getDelay(frame) {
  return frame.delay
}

module.exports = options => buffer => {
  options = Object.assign({}, defaults, options)

  if (!Buffer.isBuffer(buffer)) {
    return Promise.reject(
      new TypeError(`Expected a \`Buffer\`, got \`${typeof input}\`.`)
    )
  }

  if (!isPng(buffer)) {
    return Promise.resolve(buffer)
  }

  const img = UPNG.decode(buffer)

  const output = Buffer.from(
    UPNG.encode(
      UPNG.toRGBA8(img),
      img.width,
      img.height,
      options.cnum,
      img.frames.map(getDelay)
    )
  )

  return Promise.resolve(output)
}
