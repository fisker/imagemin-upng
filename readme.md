# imagemin-upng

> upng imagemin plugin

## Install

```sh
npm install --save imagemin-upng
```

## Usage

```js
const imagemin = require('imagemin')
const imageminUpng = require('imagemin-upng')

imagemin(['images/*.png'], 'build/images', {use: [imageminUpng()]}).then(() => {
  console.log('Images optimized')
})
```

## API

### imageminUpng([options])(buffer)

Returns a promise for a buffer.

#### options

##### cnum

Type: `number`
Default: `256`

number of colors in the result (0 = lossless, 256 = lossy).

#### buffer

Type: `Buffer`

Buffer to optimize.
