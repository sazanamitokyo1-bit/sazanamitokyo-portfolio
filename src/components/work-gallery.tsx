import type { PortfolioWork } from '@/lib/portfolio';
import { WorkImage } from './work-image';

export function WorkGallery({ works }: { works: PortfolioWork[] }) {
  return <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2">
    {works.map((work, i) => <article key={work.id} data-reveal="work" data-delay={i % 2 * 100} className="group min-w-0">
      <div className="work-image"><WorkImage src={work.image} title={work.title} /></div>
      <div className="mt-5 flex gap-3">
        <span className="pt-0.5 text-[9px] tabular-nums text-neutral-400">{String(i + 1).padStart(2, '0')}</span>
        <div><h3 className="text-[12px] font-medium leading-6 tracking-[.035em]">{work.title}</h3><p className="mt-1 text-[10px] leading-5 tracking-[.04em] text-neutral-500">{work.category} / 自主制作・架空案件</p></div>
      </div>
      <details className="mt-4 border-t border-neutral-200 pt-3">
        <summary className="cursor-pointer text-[11px] leading-7 tracking-wider text-neutral-600">作品画像を見る（{work.images.length}枚）</summary>
        <div className="mt-4 grid gap-4">{work.images.map((src, index) => <figure key={src}>
          <a href={src} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${work.title} ${index + 1}枚目を新しいタブで拡大表示`}>
            <img src={src} alt={`${work.title} — ${index + 1}枚目`} loading="lazy" decoding="async" className="h-auto w-full" />
          </a><figcaption className="mt-2 text-[10px] text-neutral-500">{index + 1} / {work.images.length} · 画像を選ぶと拡大表示</figcaption>
        </figure>)}</div>
      </details>
    </article>)}
  </div>;
}
