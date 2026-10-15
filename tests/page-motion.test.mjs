import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/components/page-motion.tsx', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
  .replace(/import \{ useEffect \} from 'react';/, '')
  .replace('export function PageMotion', 'function PageMotion');
test('scroll motion observes once, respects reduced motion and cleans up', () => {
  let cleanup, callback, changeHandler, disconnected = false;
  const observed = [], unobserved = [], calls = [];
  const animation = { cancel() { this.cancelled = true; } };
  const target = { dataset: { reveal: 'line', delay: '280' }, animate(frames, options) { calls.push({ frames, options }); return animation; } };
  const preference = { matches: false, addEventListener(_, fn) { changeHandler = fn; }, removeEventListener(_, fn) { assert.equal(fn, changeHandler); } };
  class Observer {
    constructor(fn) { callback = fn; }
    observe(el) { observed.push(el); }
    unobserve(el) { unobserved.push(el); }
    disconnect() { disconnected = true; }
  }
  const root = { querySelectorAll() { return [target]; } };
  const run = new Function('useEffect', 'document', 'window', 'Element', 'IntersectionObserver', js + '; return PageMotion();');
  run(fn => { cleanup = fn(); }, { getElementById() { return root; } }, { matchMedia() { return preference; }, IntersectionObserver: Observer }, { prototype: { animate() {} } }, Observer);
  assert.deepEqual(observed, [target]);
  callback([{ isIntersecting: false, target }]); assert.equal(calls.length, 0);
  callback([{ isIntersecting: true, target }]);
  assert.deepEqual(unobserved, [target]); assert.equal(calls[0].options.delay, 280);
  assert.equal(calls[0].options.fill, 'backwards');
  preference.matches = true; changeHandler(); assert.equal(animation.cancelled, true);
  callback([{ isIntersecting: true, target }]); assert.equal(calls.length, 1);
  cleanup(); assert.equal(disconnected, true);
});
