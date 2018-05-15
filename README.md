# txttools-titlecase

Convert string content to title case with options.

 - [JSPerf](https://jsperf.com/txttools-titlecase3)

## Usage

There are two versions, one is the main file which is used like a regular npm package to be `require`d, and the other which can be copied & pasted into any project as a plugin.

### Main File (`/titlecase.js`)

Makes use of separate function, setOptions to allow for multiple option updates to the same instance, rather than creating a new instance for every set of options like the version below.

```javascript
const tc = require('txttools-titlecase');

tc.setOptions('caps','php');

console.log(tc('"hello" world! this is not php.'));
  // Expected: "Hello" World! This Is Not PHP.

tc.setOptions({camel: 'JavaScript', lower: ['hello','world']});

console.log(tc('"hello" world! this is javascript, not php.'));
  // Expected: "hello" world! This Is JavaScript, Not PHP.
```

### Global File (`/src/titlecase.js`)

Makes use of closures to allow for the same function to act as the option setter on declaration & the titlecase function itself upon subsequent calls.

```javascript
/* File is included somewhere in the environment; directly paste, included in html, etc... */
let tc = titleCase({camel: 'JavaScript', lower: ['hello','world'], caps: 'php'});

console.log(tc('"hello" world! this is javascript, not php.'));
  // Expected: "hello" world! This Is JavaScript, Not PHP.
```

### Options

- `lower`
  - Words to appear in lowercase. Note that if the word appears after a stop punctuation (like a period, question mark etc.) or appears at the end of the string (as per titlecase publication rules) - this will be ignored.
- `caps`
  - Words to appear in all-caps.
- `camel`
  - Words which have mixed casing. Pass the word in the form of which you'd like it to appear to options and it will convert occurences of that word to that form. (eg: 'JavaScript')

If you only need to modify one of these options, you may pass it as a string rather than an object to `setOptions` (node version) or in the declaration (global version).

```javascript
// Node
const tc = require('txttools-titlecase');
tc.setOptions('lower','iou');             // Valid
tc.setOptions('caps', ['js','php'])       // Also Valid

// Global
let tc = titleCase('caps', ['js','PHP']); // Valid
```

> Note: It doesn't matter what case you pass to `lower`, `caps` options. It will work as expected either way. The only option whose casing matters when you set it is `camel`.

If you need to modify more than one at the same time, you can pass an object with each of the options as the key, and the word(s) as the values. (string|array of strings)

```javascript
// Node
const tc = require('txttools-titlecase');
tc.setOptions({lower:'iou', caps: ['js','php']}); // Valid

// Global
let tc = titleCase(caps: ['js','PHP']);           // Also Valid
```

## Dependencies

### Project

- None

### Development

| Package |                       GitHub                      |                       npm                      |                 Docs                |
|:-------:|:-------------------------------------------------:|:----------------------------------------------:|:-----------------------------------:|
|   Chai  |   [chaijs/chai](https://github.com/chaijs/chai)   |   [chai](https://www.npmjs.com/package/chai)   |   [chaijs.com](http://chaijs.com/)  |
|  Mocha  | [mochajs/mocha](https://github.com/mochajs/mocha) |  [mocha](https://www.npmjs.com/package/mocha)  | [mochajs.org](https://mochajs.org/) |
|  Rewire |  [jhnns/rewire](https://github.com/jhnns/rewire)  | [rewire](https://www.npmjs.com/package/rewire) |                                     |
|  Sinon  | [sinonjs/sinon](https://github.com/sinonjs/sinon) |  [sinon](https://www.npmjs.com/package/sinon)  |  [sinonjs.org](http://sinonjs.org/) |
