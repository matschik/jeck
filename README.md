# Jeck

<a href="https://npmjs.org/package/jeck">
  <img src="https://img.badgesize.io/matchik/jeck/master/src/index.js.svg"
       alt="size">
</a>
<a href="https://npmjs.org/package/jeck">
  <img src="https://img.shields.io/npm/v/jeck.svg"
       alt="npm version">
</a>
<a href="https://github.com/matschik/jeck/blob/master/LICENSE.md">
  <img src="https://img.shields.io/npm/l/jeck.svg"
       alt="license">
</a>

It's a small, fast utility to compare string, boolean, number, array, objects (including deep nested), null and undefined.

## Installation

Jeck works in both node.js and browser environments. For node, install with npm:

```bash
npm i jeck
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
