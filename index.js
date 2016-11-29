'use strict';

var ftw = typeof window !== 'undefined' ? window : {}
  , once = require('one-time');

/**
 * Uniform handling for event listening and removing.
 *
 * @param {Mixed} what The thing we need to listen upon.
 * @param {String} when Name of the event we need to listen on.
 * @param {Function} how Function to be executed.
 * @returns {Function}
 * @api public
 */
module.exports = function hearing(what, when, how) {
  if ('addEventListener' in what) {
    what.addEventListener(when, how, false);

    return once(function aid() {
      what.removeEventListener(when, how, false);
    });
  }

  if ('attachEvent' in what) {
    //
    // Use a small wrapper so we can force window.event for those cases when the
    // supplied event is missing (old browsers).
    //
    var wrapper = function wrapper(e) {
      how.call(this, e || ftw.event);
    };

    what.attachEvent('on'+ when, wrapper);

    return once(function aid() {
      what.detachEvent('on'+ when, wrapper);
    });
  }

  if ('on' in what) {
    what.on(when, how);

    return once(function aid() {
      if ('removeListener' in what) what.removeListener(when, how);
      else if ('off' in what) what.off(when, how);
    });
  }
};
