import fs from 'fs'
import path from 'path'
import isPng from 'is-png'
import test from 'ava'
import m from '.'

test('optimize PNG', async t => {
  const buf = await fs.readFileSync(path.join(__dirname, 'fixtures', 'png.png'))
  const data = await m()(buf)

  t.true(data.length < buf.length)
  t.true(isPng(data))
})

test('optimize APNG', async t => {
  const buf = await fs.readFileSync(path.join(__dirname, 'fixtures', 'apng.png'))
  const data = await m()(buf)

  t.true(data.length < buf.length)
  t.true(isPng(data))
})

test('support options', async t => {
  const buf = await fs.readFileSync(path.join(__dirname, 'fixtures', 'png.png'))
  const data = await m({
    cnum: 128
  })(buf)

  t.true(data.length < 28000)
  t.true(isPng(data))
})

test('skip optimizing a non-PNG file', async t => {
  const buf = await fs.readFileSync(__filename)
  const data = await m()(buf)

  t.is(data.length, buf.length)
})

test('skip optimizing a fully optimized PNG', async t => {
  const buf = await fs.readFileSync(
    path.join(__dirname, 'fixtures', 'png-compressed.png')
  )
  const data = await m()(buf)
  t.is(data.length, buf.length)
  t.true(isPng(data))
})

test('skip optimizing a fully optimized APNG', async t => {
  const buf = await fs.readFileSync(
    path.join(__dirname, 'fixtures', 'apng-compressed.png')
  )
  const data = await m()(buf)
  t.is(data.length, buf.length)
  t.true(isPng(data))
})
