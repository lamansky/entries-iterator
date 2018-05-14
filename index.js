'use strict'

const addCounter = require('add-counter')
const emptyIterator = require('empty-iterator')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const props = require('props-iterator')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, {inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) => {
  if (isIterator(c) || is(c, ['Set', sets])) return addCounter(c)
  if (typeof c === 'string') return Array.from(c).entries()
  if (is(c, ['Array', arrays, 'Map', maps, typedArrays])) return c.entries()[Symbol.iterator]()
  if (isObject(c)) return props(c, {enumOnly: !reflectObj, own: !inObj})
  return emptyIterator()
})
