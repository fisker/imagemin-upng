import imagemin from 'imagemin'
import imageminUpng from 'imagemin-upng'

const files = await imagemin(['images/*.png'], {
  destination: 'build/images',
  plugins: [imageminUpng()],
})

console.log(files)
