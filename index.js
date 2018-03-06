'use strict'

const addCounter = require('add-counter')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const props = require('props-iterator')
const sbo = require('sbo')
const structures = ['Array', 'Map', require('typed-arrays').names()]

module.exports = sbo((c, {inObj, reflectObj} = {}) => {
  if (typeof c === 'string') return Array.from(c).entries()
  if (isIterator(c)) return addCounter(c)
  if (is(c, 'Set')) return addCounter(c.values())
  if (is(c, structures)) return c.entries()
  return props(c, {enumOnly: !reflectObj, own: !inObj})
})
