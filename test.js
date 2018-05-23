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

  it('should iterate entries of a custom Map class', function () {
    class MyMap {
      entries () { return [['key', 'value']] }
    }
    assert.strictEqual(entries(new MyMap()).next().done, true)
    const i = entries(new MyMap(), {maps: MyMap})
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify(['key', 'value']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate entries of a custom Map class referenced by name string', function () {
    class MyMap {
      entries () { return [['key', 'value']] }
    }
    assert.strictEqual(entries(new MyMap()).next().done, true)
    const i = entries(new MyMap(), {maps: 'MyMap'})
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

  it('should iterate inherited Object properties if `inObj` is true', function () {
    function A () {}
    A.prototype.key = 'value'
    const a = Array.from(entries(new A(), {inObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(([k, v]) => k === 'key' && v === 'value'))
  })

  it('should iterate non-enumerable Object properties if `reflectObj` is true', function () {
    const obj = {}
    Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})
    assert.strictEqual(Array.from(entries(obj)).length, 0)
    const a = Array.from(entries(obj, {reflectObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(([k, v]) => k === 'key' && v === 'value'))
  })

  it('should iterate Set entries', function () {
    const i = entries(new Set(['value']))
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'value']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate String characters', function () {
    const i = entries('hi')
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'h']))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([1, 'i']))
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Typed Array entries', function () {
    const i = entries(new Int32Array(new ArrayBuffer(4)))
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 0]))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for undefined', function () {
    const i = entries()
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for null', function () {
    const i = entries(null)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for a number', function () {
    const i = entries(123)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for a symbol', function () {
    const i = entries(Symbol.iterator)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return entries in reverse order if `reverse` is true', function () {
    const i = entries(['a', 'b'], {reverse: true})
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([1, 'b']))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'a']))
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = entries.call(['test'])
    assert(isIterator(i))
    assert.strictEqual(JSON.stringify(i.next().value), JSON.stringify([0, 'test']))
    assert.strictEqual(i.next().done, true)
  })
})
