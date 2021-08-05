import {Buffer} from 'node:buffer'
import {decode, encode, toRGBA8} from 'lib-upng'
import isPng from 'is-png'

function process(options) {
  options = {
    cnum: 256,
    ...options,
  }

  return async (input) => {
    if (!Buffer.isBuffer(input)) {
      throw new TypeError(`Expected a \`Buffer\`, got \`${typeof input}\`.`)
    }

    if (!isPng(input)) {
      return input
    }

    const img = decode(input)

    const output = Buffer.from(
      encode(
        toRGBA8(img),
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
