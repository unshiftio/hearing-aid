// Type definitions for: hearing-aid
/// <reference lib="dom">
/// <reference types="node">
export = hearing;

// Browser
declare function hearing(
  what: EventTarget,
  when: string,
  how: EventListenerOrEventListenerObject): () => void;

// Node
declare function hearing(
  what: import('events').EventEmitter,
  when: string,
  how: (...args: any) => any): () => void;

// Ad-hoc
declare function hearing(
  what: Object & ({
    addEventListener: Function,
    removeEventListener?: Function
  } | {
    attachEvent: Function,
    detachEvent?: Function
  } | {
    on: Function,
    removeListener?: Function,
    off?: Function
  }),
  when: string,
  how: Function): () => void;
