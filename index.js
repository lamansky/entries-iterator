'use strict'

const addCounter = require('add-counter')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const sbo = require('sbo')
const structures = ['Array', 'Map', require('typed-arrays').names()]

module.exports = sbo(c => isIterator(c) ? addCounter(c) : is(c, 'Set') ? addCounter(c.values()) : is(c, structures) ? c.entries() : Object.entries(c)[Symbol.iterator]())
