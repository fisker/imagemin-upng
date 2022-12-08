# imagemin-upng

> upng imagemin plugin

## Install

```bash
npm install --save imagemin-upng
```

## Usage

CLI

```bash
imagemin foo.png --plugin=upng > foo-optimized.png
```

API

```js
import imagemin from 'imagemin'
import imageminUpng from 'imagemin-upng'

const files = await imagemin(['images/*.png'], {
  destination: 'build/images',
  plugins: [imageminUpng()],
})

console.log(files)
//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
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
