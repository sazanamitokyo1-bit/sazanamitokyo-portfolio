import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/lib/portfolio.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { portfolioWorks } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
test('all supplied images are present, grouped and ordered for the portfolio', () => {
  assert.deepEqual(portfolioWorks.map(w => w.category), ['スライドデザイン','スライドデザイン','Instagramフィードデザイン','X図解','X図解','X図解']);
  const images = portfolioWorks.flatMap(w => w.images);
  assert.equal(images.length, 15);
  assert.equal(new Set(images).size, 15);
  portfolioWorks.forEach((w,i) => {
    assert.equal(w.order, i+1); assert.equal(w.client, ''); assert.ok(w.title);
    assert.ok(w.images.includes(w.image));
  });
  images.forEach(src => assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), src));
});
