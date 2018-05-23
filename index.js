'use strict'

const addCounter = require('add-counter')
const emptyIterator = require('empty-iterator')
const entriesArray = require('entries-array')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const props = require('prop-entries')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, o = {}) => o.reverse ? entriesArray(c, o)[Symbol.iterator]() : entriesIterator(c, o))

function entriesIterator (c, {inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) {
  if (isIterator(c) || is(c, ['Set', sets])) return addCounter(c)
  if (typeof c === 'string') return Array.from(c).entries()
  // Even though .entries() returns an iterator, be on the safe side in case a custom class returns an array:
  if (is(c, ['Array', arrays, 'Map', maps, typedArrays])) return c.entries()[Symbol.iterator]()
  if (isObject(c)) return props(c, {enumOnly: !reflectObj, own: !inObj})[Symbol.iterator]()
  return emptyIterator()
}
