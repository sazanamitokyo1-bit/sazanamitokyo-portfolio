import 'server-only';

export type Work = { id: string; title: string; category: string; client: string; image: string; order: number };
export type WorksResult = { works: Work[]; status: 'live' | 'demo' | 'error' };
type Property = { type?: string; title?: { plain_text: string }[]; rich_text?: { plain_text: string }[]; select?: { name: string } | null; multi_select?: { name: string }[]; files?: { type: string; file?: { url: string }; external?: { url: string } }[]; url?: string | null; number?: number | null };
type Page = { id: string; properties: Record<string, Property> };
const demoWorks: Work[] = [
  { id: '01', title: '複雑な情報に、ひとつの道筋を。', category: 'Information design', client: 'CONCEPT WORK', image: '/works/information.svg', order: 1 },
  { id: '02', title: '循環する社会の、見取り図。', category: 'Infographic', client: 'CONCEPT WORK', image: '/works/circular.svg', order: 2 },
  { id: '03', title: '伝わるまでを、デザインする。', category: 'Diagram design', client: 'CONCEPT WORK', image: '/works/process.svg', order: 3 },
  { id: '04', title: '数字の向こうにあるストーリー。', category: 'Data visualization', client: 'CONCEPT WORK', image: '/works/data.svg', order: 4 },
];
function text(p?: Property): string {
  return (p?.title ?? p?.rich_text)?.map(t => t.plain_text).join('') ?? p?.select?.name ?? p?.multi_select?.map(t => t.name).join(' / ') ?? '';
}
function safeImage(value?: string | null): string {
  if (!value) return '';
  try { return new URL(value).protocol === 'https:' ? value : ''; } catch { return ''; }
}
export async function getWorks(): Promise<WorksResult> {
  const key = process.env.NOTION_API_KEY;
  const database = process.env.NOTION_DATABASE_ID;
  if (!key && !database) return { works: demoWorks, status: 'demo' };
  if (!key || !database) return { works: [], status: 'error' };
  try {
    const works: Work[] = [];
    let cursor: string | undefined;
    do {
      const response = await fetch(`https://api.notion.com/v1/databases/${encodeURIComponent(database)}/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter: { property: 'Published', checkbox: { equals: true } }, sorts: [{ property: 'Order', direction: 'ascending' }], page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }),
        cache: 'no-store', signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`Notion status ${response.status}`);
      const data = await response.json() as { results: Page[]; has_more: boolean; next_cursor: string | null };
      for (const page of data.results) {
        const p = page.properties;
        const file = p.Image?.files?.[0];
        works.push({ id: page.id, title: text(p.Title) || 'Untitled', category: text(p.Category), client: text(p.Client), image: safeImage(file?.file?.url ?? file?.external?.url ?? p.Image?.url), order: p.Order?.number ?? 0 });
      }
      if (data.has_more && !data.next_cursor) throw new Error('Missing pagination cursor');
      cursor = data.has_more ? data.next_cursor! : undefined;
    } while (cursor);
    return { works, status: 'live' };
  } catch {
    console.error('Notion作品取得に失敗しました。接続設定、共有権限、データベースのプロパティを確認してください。');
    return { works: [], status: 'error' };
  }
}
