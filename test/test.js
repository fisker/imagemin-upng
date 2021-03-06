import fs from 'fs'
import path from 'path'
import isPng from 'is-png'
import test from 'ava'
import imagemin from 'imagemin'
import upng from '../src'

function getFixture(file) {
  return path.join(__dirname, 'fixtures', file)
}

function readFixture(file) {
  return fs.readFileSync(getFixture(file))
}

function writeFixture(file, data) {
  return fs.writeFileSync(getFixture(file), data)
}

test('reject on non-buffer', async (t) => {
  await t.throwsAsync(upng()(null), {instanceOf: TypeError})
})

test('optimize PNG', async (t) => {
  const buffer = readFixture('png.png')
  const data = await upng()(buffer)

  writeFixture('png-compressed.png', data)

  t.true(data.length < buffer.length)
  t.true(isPng(data))
})

test('optimize APNG', async (t) => {
  const buffer = readFixture('apng.png')
  const data = await upng()(buffer)

  writeFixture('apng-compressed.png', data)

  t.true(data.length < buffer.length)
  t.true(isPng(data))
})

test('support options', async (t) => {
  const buffer = readFixture('png.png')
  const data = await upng({
    cnum: 128,
  })(buffer)

  t.true(data.length < 28000)
  t.true(isPng(data))
})

test('skip optimizing a non-PNG file', async (t) => {
  const buffer = await fs.readFileSync(__filename)
  const data = await upng()(buffer)

  t.is(data.length, buffer.length)
})

// eslint-disable-next-line ava/no-skip-test
test.skip('skip optimizing a fully optimized PNG', async (t) => {
  const buffer = readFixture('png-compressed.png')
  const data = await upng()(buffer)
  t.is(data.length, buffer.length)
  t.true(isPng(data))
})

// eslint-disable-next-line ava/no-skip-test
test.skip('skip optimizing a fully optimized APNG', async (t) => {
  const buffer = readFixture('apng-compressed.png')
  const data = await upng()(buffer)
  t.is(data.length, buffer.length)
  t.true(isPng(data))
})

test('imagemin', async (t) => {
  const buffer = readFixture('png.png')
  const data = await upng()(buffer)
  const result = await imagemin.buffer(buffer, {
    plugins: [upng()],
  })
  t.is(data.length, result.length)
  const resultWithoutUpng = await imagemin.buffer(buffer)
  t.true(result.length < resultWithoutUpng.length)
})
