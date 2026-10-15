import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/lib/notion.ts', import.meta.url), 'utf8').replace("import 'server-only';", '');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { getWorks } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
test('Notion configuration, filters, pagination, mapping and failure handling', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.NOTION_API_KEY;
  const originalId = process.env.NOTION_DATABASE_ID;
  try {
    delete process.env.NOTION_API_KEY; delete process.env.NOTION_DATABASE_ID;
    assert.equal((await getWorks()).status, 'demo');
    process.env.NOTION_API_KEY = 'test-only';
    assert.equal((await getWorks()).status, 'error');
    process.env.NOTION_DATABASE_ID = 'test-database';
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://api.notion.com/v1/databases/test-database/query');
      const body = JSON.parse(options.body);
      assert.deepEqual(body.filter, { property: 'Published', checkbox: { equals: true } });
      assert.deepEqual(body.sorts, [{ property: 'Order', direction: 'ascending' }]);
      calls++;
      if (calls === 1) return Response.json({ results: [{ id: 'one', properties: { Title: { title: [{ plain_text: '作品' }] }, Category: { multi_select: [{ name: '図解' }] }, Client: { rich_text: [{ plain_text: 'クライアント' }] }, Image: { files: [{ type: 'external', external: { url: 'https://example.com/image.png' } }] }, Order: { number: 1 } } }], has_more: true, next_cursor: 'next' });
      assert.equal(body.start_cursor, 'next');
      return Response.json({ results: [{ id: 'two', properties: { Image: { url: 'javascript:alert(1)' } } }], has_more: false, next_cursor: null });
    };
    const result = await getWorks();
    assert.equal(calls, 2); assert.equal(result.status, 'live');
    assert.deepEqual(result.works[0], { id: 'one', title: '作品', category: '図解', client: 'クライアント', image: 'https://example.com/image.png', order: 1 });
    assert.equal(result.works[1].image, '');
    globalThis.fetch = async () => Response.json({ results: [], has_more: false, next_cursor: null });
    assert.deepEqual(await getWorks(), { works: [], status: 'live' });
    globalThis.fetch = async () => new Response('', { status: 401 });
    assert.deepEqual(await getWorks(), { works: [], status: 'error' });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.NOTION_API_KEY; else process.env.NOTION_API_KEY = originalKey;
    if (originalId === undefined) delete process.env.NOTION_DATABASE_ID; else process.env.NOTION_DATABASE_ID = originalId;
  }
});
