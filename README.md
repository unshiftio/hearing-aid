# hearing-aid

Hearing-aid provides a uniform interface for listening to and removing event
listeners. It supports DOM elements, EventEmitters -- anything with an event
interface basically.

## Installation

The module is released in the public npm interface.

```
npm install --save heairing-aid
```

## Usage

The module exposes a single function that is used to listen to all the things.
When you assigned the listener it returns a function that does the clean up.

```js
var hearing = require('hearing-aid');

var remove = hearing(window, 'resize', function () {
  //
  // Remove the listener.
  //
  remove();
});
```

As you can see in the example above, the following arguments are required:

- The thing you want to listen on. It can be any event supporting interface.
- The name of the event you want to listen for.
- The function that should be triggered.
