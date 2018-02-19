'use strict'

const assert = require('assert')
const isIterator = require('is-iterator')
const entries = require('.')

describe('entriesIterator()', function () {
  it('should iterate Array entries', function () {
    const i = entries(['a', 'b'])
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'a']))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([1, 'b']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate iterator entries', function () {
    function * gen () {
      yield 'a'
      yield 'b'
    }

    const i = entries(gen())
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'a']))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([1, 'b']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Map entries', function () {
    const i = entries(new Map([['key', 'value']]))
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify(['key', 'value']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Object entries', function () {
    const i = entries({key: 'value'})
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify(['key', 'value']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Set entries', function () {
    const i = entries(new Set(['value']))
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'value']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Typed Array entries', function () {
    const i = entries(new Int32Array(new ArrayBuffer(4)))
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 0]))
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = entries.call(['test'])
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'test']))
    assert.strictEqual(i.next().done, true)
  })
})
