# imagemin-upng

> upng imagemin plugin


## Install

```
$ npm install --save imagemin-upng
```

## Usage

```js
const imagemin = require('imagemin');
const imageminUPNG = require('imagemin-upng');

imagemin(['images/*.png'], 'build/images', {use: [imageminUPNG()]}).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminUPNG([options])(buffer)

Returns a promise for a buffer.

#### options

##### cnum

Type: `number`<br>
Default: `256`

number of colors in the result (0 = lossless, 256 = lossy).


#### buffer

Type: `Buffer`

Buffer to optimize.

## License

MIT © [fisker Cheung](https://github.com/fisker)
