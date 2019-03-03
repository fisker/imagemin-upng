import fs from 'fs'
import path from 'path'
import isPng from 'is-png'
// eslint-disable-next-line import/no-extraneous-dependencies
import test from 'ava'
import m from '..'

function getFixture(file) {
  return path.join(__dirname, 'fixtures', file)
}

function readFixture(file) {
  return fs.readFileSync(getFixture(file))
}

function writeFixture(file, data) {
  return fs.writeFileSync(getFixture(file), data)
}

test('optimize PNG', async t => {
  const buf = readFixture('png.png')
  const data = await m()(buf)

  writeFixture('png-compressed.png', data)

  t.true(data.length < buf.length)
  t.true(isPng(data))
})

test('optimize APNG', async t => {
  const buf = readFixture('apng.png')
  const data = await m()(buf)

  writeFixture('apng-compressed.png', data)

  t.true(data.length < buf.length)
  t.true(isPng(data))
})

test('support options', async t => {
  const buf = readFixture('png.png')
  const data = await m({
    cnum: 128,
  })(buf)

  t.true(data.length < 28000)
  t.true(isPng(data))
})

test('skip optimizing a non-PNG file', async t => {
  const buf = await fs.readFileSync(__filename)
  const data = await m()(buf)

  t.is(data.length, buf.length)
})

test.skip('skip optimizing a fully optimized PNG', async t => {
  const buf = readFixture('png-compressed.png')
  const data = await m()(buf)
  t.is(data.length, buf.length)
  t.true(isPng(data))
})

test.skip('skip optimizing a fully optimized APNG', async t => {
  const buf = readFixture('apng-compressed.png')
  const data = await m()(buf)
  t.is(data.length, buf.length)
  t.true(isPng(data))
})
