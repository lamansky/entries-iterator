'use strict'

const addCounter = require('add-counter')
const emptyIterator = require('empty-iterator')
const entriesArray = require('entries-array')
const every = require('@lamansky/every')
const is = require('is-instance-of')
const isArrayOfLength = require('is-array-of-length')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const props = require('prop-entries')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, o = {}) => o.reverse ? entriesArray(c, o)[Symbol.iterator]() : entriesIterator(c, o))

function entriesIterator (c, {detectPairs, inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) {
  if (isIterator(c) || is(c, ['Set', sets])) return addCounter(c)
  if (typeof c === 'string') return Array.from(c).entries()
  const isArray = is(c, ['Array', arrays])
  if (isArray && detectPairs && every(c, e => isArrayOfLength(e, 2, {arrays}))) return c[Symbol.iterator]()
  if (isArray || is(c, ['Map', maps, typedArrays])) return c.entries()[Symbol.iterator]() // in case a custom class returns a non-iterator iterable
  if (isObject(c)) return props(c, {enumOnly: !reflectObj, own: !inObj})[Symbol.iterator]()
  return emptyIterator()
}
