import {promises as fs} from 'node:fs'
import isPng from 'is-png'
import test from 'ava'
import imagemin from 'imagemin'
import upng from '../index.js'

function getFixture(file) {
  return new URL(`fixtures/${file}`, import.meta.url)
}

function readFixture(file) {
  return fs.readFile(getFixture(file))
}

function writeFixture(file, data) {
  return fs.writeFile(getFixture(file), data)
}

test('reject on non-buffer', async (t) => {
  await t.throwsAsync(upng()(null), {instanceOf: TypeError})
})

test('optimize PNG', async (t) => {
  const buffer = await readFixture('png.png')
  const data = await upng()(buffer)

  writeFixture('png-compressed.png', data)

  t.true(data.length < buffer.length)
  t.true(isPng(data))
})

test('optimize APNG', async (t) => {
  const buffer = await readFixture('apng.png')
  const data = await upng()(buffer)

  writeFixture('apng-compressed.png', data)

  t.true(data.length < buffer.length)
  t.true(isPng(data))
})

test('support options', async (t) => {
  const buffer = await readFixture('png.png')
  const data = await upng({
    cnum: 128,
  })(buffer)

  t.true(data.length < 28_000)
  t.true(isPng(data))
})

test('skip optimizing a non-PNG file', async (t) => {
  const buffer = await fs.readFile(new URL(import.meta.url))
  const data = await upng()(buffer)

  t.is(data.length, buffer.length)
})

// eslint-disable-next-line ava/no-skip-test
test.skip('skip optimizing a fully optimized PNG', async (t) => {
  const buffer = await readFixture('png-compressed.png')
  const data = await upng()(buffer)
  t.is(data.length, buffer.length)
  t.true(isPng(data))
})

// eslint-disable-next-line ava/no-skip-test
test.skip('skip optimizing a fully optimized APNG', async (t) => {
  const buffer = await readFixture('apng-compressed.png')
  const data = await upng()(buffer)
  t.is(data.length, buffer.length)
  t.true(isPng(data))
})

test('imagemin', async (t) => {
  const buffer = await readFixture('png.png')
  const data = await upng()(buffer)
  const result = await imagemin.buffer(buffer, {
    plugins: [upng()],
  })
  t.is(data.length, result.length)
  const resultWithoutUpng = await imagemin.buffer(buffer)
  t.true(result.length < resultWithoutUpng.length)
})
