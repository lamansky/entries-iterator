# entries-iterator

Returns an iterator of the key-value pairs of an Object, Map, Array, or Typed Array. Useful for when you need the entries of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i entries-iterator
```

## API

The module exports a single function.

### Parameters

1. Bindable: `c` (Array, iterator, Object, Map, Set, string, or Typed Array)
2. Optional: Object argument:
    * `arrays` / `maps` / `sets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set` (respectively).
    * `detectPairs` (boolean): This option only has an effect when `c` is an Array of two-item pairs, such as `[[1, 2], [3, 4]]`. When `detectPairs` is set to `false` (the default behavior), the Array indexes will be used as the keys (the items will be iterated as `[0, [1, 2]]` and `[1, [3, 4]]`). But if `detectPairs` is `true`, the module will interpret the first item in each pair as the entry key (the items will be iterated as `[1, 2]` and `[3, 4]`).
    * `inObj` (boolean): Whether or not to act like the “in” operator by including inherited Object properties. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `reflectObj` (boolean): Whether or not to include non-enumerable Object properties by using reflection. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `reverse` (boolean): If `true`, then entries are iterated in reverse order. Defaults to `false`.

### Return Value

An iterator which yields two-element key-value pair arrays.

## Examples

### Arrays

```javascript
const entries = require('entries-iterator')

const i = entries(['a', 'b'])
i.next().value // [0, 'a']
i.next().value // [1, 'b']
i.next().done // true

// Supports the bind operator
['a', 'b']::entries()
```

Examples using an array of entries (key/value pairs):

```javascript
const entries = require('entries-iterator')

const arr = [['key1', 'val1'], ['key2', 'val2']]

// Default behavior without the `detectPairs` option
const i1 = entries(arr)
i1.next().value // [0, ['key1', 'val1']]
i1.next().value // [1, ['key2', 'val2']]
i1.next().done // true

// With `detectPairs` set to `true`
const i2 = entries(arr, {detectPairs: true})
i2.next().value // ['key1', 'val1']
i2.next().value // ['key2', 'val2']
i2.next().done // true
```

### Iterators

`entries-iterator` will treat an iterator as if it were an array of values. Each “key” will be an incrementing integer index that starts at zero.

```javascript
const entries = require('entries-iterator')

function * gen () {
  yield 'a'
  yield 'b'
}

const i = entries(gen())
i.next().value // [0, 'a']
i.next().value // [1, 'b']
i.next().done // true
```

### Maps

```javascript
const entries = require('entries-iterator')

const map = new Map()
map.set('key', 'value')

const i = entries(map)
i.next().value // ['key', 'value']
i.next().done // true
```

### Objects

When we say “Object” here, we mean an `Object` that does not fall under another recognized category (like Array or Map).

```javascript
const entries = require('entries-iterator')

const i = entries({key: 'value'})
i.next().value // ['key', 'value']
i.next().done // true

// Supports the bind operator
const obj = {key: 'value'}
obj::entries()
```

#### Inherited Object Properties

Include Object properties from the prototype chain by setting `inObj` to `true`:

```javascript
const entries = require('entries-iterator')

function Cls () {}
Cls.prototype.key = 'value'

const i = entries(new Cls(), {inObj: true})
i.next().value // ['key', 'value']
i.next().done // true
```

#### Non-Enumerable Object Properties

Include non-enumerable Object properties by setting `reflectObj` to `true`:

```javascript
const entries = require('entries-iterator')

const obj = {}
Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})

const i = entries(obj, {reflectObj: true})
i.next().value // ['key', 'value']
i.next().done // true
```

### Sets

`entries-iterator` will treat a Set like an array, and will add integer index keys starting at zero. Note that this behavior is different from that of the built-in [`Set.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) method.

```javascript
const entries = require('entries-iterator')

const set = new Set()
set.add('first')
set.add('second')

const i = entries(set)
i.next().value // [0, 'first']
i.next().value // [1, 'second']
i.next().done // true
```

### Strings

`entries-iterator` will treat a string like a character array.

```javascript
const entries = require('entries-iterator')

const i = entries('hi')
i.next().value // [0, 'h']
i.next().value // [1, 'i']
i.next().done // true
```

### Typed Arrays

```javascript
const entries = require('entries-iterator')

const typedArray = new Int32Array(new ArrayBuffer(4))

const i = entries(typedArray)
i.next().value // [0, 0]
i.next().done // true
```

## Related

* [entries-array](https://github.com/lamansky/entries-array)
* [keys-iterator](https://github.com/lamansky/keys-iterator)
* [keys-array](https://github.com/lamansky/keys-array)
* [props-iterator](https://github.com/lamansky/props-iterator)
* [values-iterator](https://github.com/lamansky/values-iterator)
* [values-array](https://github.com/lamansky/values-array)
