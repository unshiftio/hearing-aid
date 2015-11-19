/* istanbul ignore next */
describe('hearing', function () {
  'use strict';

  //
  // Fixture for event fallback.
  //
  global.window = {
    event: {
      fixture: true
    }
  };

  var assume = require('assume')
    , hearing = require('./');

  it('throws an error when no listener methods are found', function (next) {
    try {
      hearing({}, 'name', function () {});
    } catch (e) {
      assume(e.message).includes('No event listening interface found');

      next();
    }
  });

  describe('attaching', function () {
    it('attaches with attachEvent', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        attachEvent: function (name, fn) {
          assume(name).equals('onevent name');
          assume(fn).is.a('function');
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      next();
    });

    it('prefers addEventListener above attachEvent', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        addEventListener: function (name, fn) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
        },
        attachEvent: function (name, fn) {
          throw new Error('This shit is broken');
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      next();
    });

    it('sets the capture boolean on attachEventListener', function (next) {
      next = assume.plan(4, next);

      var remove = hearing({
        addEventListener: function (name, fn, capture) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
          assume(capture).is.false();
        },
      }, 'event name', function () {});

      assume(remove).is.a('function');
      next();
    });

    it('listeners to EventEmitters', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        on: function (name, fn) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
        },
      }, 'event name', function () {});

      assume(remove).is.a('function');
      next();
    });

    it('normalizes events', function (next) {
      var remove = hearing({
        attachEvent: function (evt, fn) {
          fn();
        }
      }, 'event', function (evt) {
        assume(evt.fixture).is.true();

        next();
      });
    });
  });

  describe('detaching', function () {
    it('detachEvent', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        attachEvent: function () {},
        detachEvent: function (name, fn) {
          assume(name).equals('onevent name');
          assume(fn).is.a('function');
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      remove();

      next();
    });

    it('removesEventlistener', function (next) {
      next = assume.plan(4, next);

      var remove = hearing({
        addEventListener: function () {},
        removeEventListener: function (name, fn, capture) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
          assume(capture).is.false();
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      remove();

      next();
    });

    it('removeListener', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        on: function () {},
        removeListener: function (name, fn) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      remove();

      next();
    });

    it('off', function (next) {
      next = assume.plan(3, next);

      var remove = hearing({
        on: function () {},
        off: function (name, fn) {
          assume(name).equals('event name');
          assume(fn).is.a('function');
        }
      }, 'event name', function () {});

      assume(remove).is.a('function');
      remove();

      next();
    });
  });
});
