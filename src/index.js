import UPNG from 'upng-js'
import isPng from 'is-png'

function process(options) {
  options = {
    cnum: 256,
    ...options,
  }

  return async input => {
    if (!Buffer.isBuffer(input)) {
      throw new TypeError(`Expected a \`Buffer\`, got \`${typeof input}\`.`)
    }

    if (!isPng(input)) {
      return input
    }

    const img = UPNG.decode(input)

    const output = Buffer.from(
      UPNG.encode(
        UPNG.toRGBA8(img),
        img.width,
        img.height,
        options.cnum,
        img.frames.map(({delay}) => delay)
      )
    )

    return output
  }
}

export default process
