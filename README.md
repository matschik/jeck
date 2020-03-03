# Jeck

> Small utility to compare string, boolean, number, array, objects (including deep nested), null and undefined.


<a href="https://travis-ci.org/matschik/jeck">
  <img src="https://travis-ci.org/matschik/jeck.svg?branch=master"
       alt="size">
</a>
<a href="https://npmjs.org/package/jeck">
  <img src="https://img.badgesize.io/matschik/jeck/master/src/index.js.svg?compression=gzip"
       alt="size">
</a>
<a href="https://npmjs.org/package/jeck">
  <img src="https://img.shields.io/npm/v/jeck.svg"
       alt="npm version">
</a>
<a href="https://github.com/facebook/jest">
  <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg"
       alt="npm version">
</a>
<a href="https://github.com/matschik/jeck/blob/master/LICENSE.md">
  <img src="https://img.shields.io/npm/l/jeck.svg"
       alt="license">
</a>

## Why ?
I was looking for a lightweight library just showing if two values are different or not.
To keep it small:
- It does not show the diff, it's only returning a `boolean`.
- It does not support values like "Function" or "Regex" values. When value(s) is not supported, it returns `null`.

## Installation

Jeck works in both node.js and browser environments. For node, install with npm:

```bash
npm i jeck
```

To use in browser, grab the [jeck.umd.js](https://unpkg.com/jeck/dist/jeck.umd.js) file and add it to your page:

```html
<script src="https://unpkg.com/jeck/dist/jeck.umd.js"></script>
```

Available in ESM, CJS and UMD formats.

## Usage

These examples assume you're in node.js, or something similar:

```js
const jeck = require("jeck");

// Primitive values
jeck(42, 17); // false
jeck(["orange", "apple", "ananas"], ["mango"]); // false
jeck(null, null); // true
jeck(undefined, undefined); // true

// Without array order tolerancy
jeck(["mango", true, 42], [42, "mango", true]); // false
// With array order tolerancy
jeck(["mango", true, 42], [42, "mango", true], { orderTolerant: true }); // true

// Object with nested structure
const deepA = {
  a: { lot: { of: { nested: { levels: { in: { this: "object" } } } } } }
};
const deepB = {
  a: { lot: { of: { nested: { levels: { in: { this: { object: true } } } } } } }
};
jeck(deepA, deepB); // false

// Array with nested structures
const arrayA = [{ type: "shadow" }, { type: "grass", isStrong: true }];
const arrayB = [{ type: "fire" }, { type: "water", isWeak: false }];

jeck(arrayA, arrayB); // false
```

Checkout more examples in: `__tests__/jeck.js`

## License

MIT
