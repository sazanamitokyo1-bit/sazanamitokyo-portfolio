import { PageMotion } from '@/components/page-motion';
import { Brand } from '@/components/brand';
import { portfolioWorks } from '@/lib/portfolio';
import { WorkGallery } from '@/components/work-gallery';
const links = [['WORKS', 'works'], ['ABOUT', 'about'], ['SERVICES & FEES', 'services'], ['PROCESS', 'process'], ['FAQ', 'faq'], ['CONTACT', 'contact']];
export default function Home() {
  const works = portfolioWorks;
  return <>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <aside className="sidebar">
      <Brand />
      <p className="mt-5 text-[11px] leading-6 tracking-[.08em] text-neutral-500">Information Architecture<br />Diagram / Infographic Design</p>
      <nav aria-label="メインナビゲーション" className="navigation">{links.map(([label, id], i) => <a key={id} href={`#${id}`} className="nav-link"><span className="nav-number">0{i + 1}</span>{label}<span className="nav-arrow">↗</span></a>)}</nav>
      <div className="sidebar-bottom"><span className="flex items-center gap-2 text-[10px] tracking-widest"><span className="h-1.5 w-1.5 rounded-full bg-neutral-400" /> TOKYO, JAPAN</span><p className="mt-5 text-[9px] tracking-wider text-neutral-400">© {new Date().getFullYear()} SAZANAMI TOKYO</p></div>
    </aside>
    <main id="main" className="main-area">
      <PageMotion />
      <section id="works" className="scroll-mt-8">
        <header className="intro"><div className="flex items-center justify-between text-[10px] tracking-[.16em] text-neutral-500"><p>INFORMATION INTO UNDERSTANDING.</p><span className="hidden sm:block">PORTFOLIO / 2026</span></div><h1 className="hero-title"><span className="headline-line"><span data-reveal="line" data-delay="100">複雑をほどき、</span></span><span className="headline-line"><span data-reveal="line" data-delay="280">伝わるかたちへ。</span></span></h1><p data-reveal="fade" data-delay="450" className="hero-description">情報を整理し、本質を見つける。<br />図解とデザインで、理解のきっかけをつくります。</p></header>
        <div className="mb-7 flex items-center justify-between border-t border-neutral-200 pt-5"><h2 className="text-[11px] tracking-[.18em]">SELECTED WORKS <span className="ml-2 text-neutral-400">({String(works.length).padStart(2, '0')})</span></h2><span className="text-[9px] tracking-widest text-neutral-400">INDEPENDENT PROJECTS</span></div>
        <p className="mb-6 text-[11px] leading-6 text-neutral-500">掲載作品はすべて、架空の案件を想定して制作した自主制作です。実際のクライアントからのご依頼実績ではありません。</p>
        <WorkGallery works={works} />
      </section>
      <section id="about" className="detail-section"><p className="eyebrow">02 / ABOUT</p><h2 data-reveal="heading" className="section-title">情報と、人のあいだに。</h2><p data-reveal="fade" data-delay="130" className="body-copy">SAZANAMI TOKYO は、情報設計・図解を軸とするデザインスタジオです。<br />伝えたいことを丁寧にひもとき、読み手に届く順序と表現を考えます。<br />小さな理解が、次の行動につながるデザインを目指しています。</p></section>
      <section id="services" className="detail-section"><p className="eyebrow">03 / SERVICES & FEES</p><h2 data-reveal="heading" className="section-title">伝える目的から、考える。</h2><div className="mt-8">{[['01', '情報設計・構成', '資料やコンテンツの整理、伝達順序の設計。'], ['02', '図解・インフォグラフィック', '仕組みや関係性、データを視覚化。'], ['03', '資料・スライドデザイン', '企画書、提案資料、サービス紹介のデザイン。']].map(([n,t,d]) => <div key={n} className="service-row"><span className="text-[10px] text-neutral-400">{n}</span><div><h3 className="text-sm">{t}</h3><p className="mt-2 text-xs leading-6 text-neutral-500">{d}</p></div><span className="text-[10px] text-neutral-500">個別お見積り</span></div>)}</div><p className="mt-5 text-xs leading-7 text-neutral-500">料金は内容・点数・納期により異なります。ご相談内容を確認後、お見積りします。</p></section>
      <section id="process" className="detail-section"><p className="eyebrow">04 / PROCESS</p><h2 data-reveal="heading" className="section-title">対話から、伝わるかたちまで。</h2><ol className="mt-9 grid gap-7 sm:grid-cols-2">{[['ヒアリング', '目的・課題・届けたい相手を共有します。'], ['情報整理・構成', '情報の優先順位と全体の流れを設計します。'], ['デザイン・調整', '構成を視覚化し、対話を重ねて磨きます。'], ['納品', '使用媒体に合わせた形式でお届けします。']].map(([t,d], i) => <li key={t} className="border-t border-neutral-200 pt-4"><span className="text-[10px] text-neutral-400">STEP 0{i+1}</span><h3 className="mt-3 text-sm">{t}</h3><p className="mt-2 text-xs leading-7 text-neutral-500">{d}</p></li>)}</ol></section>
      <section id="faq" className="detail-section"><p className="eyebrow">05 / FAQ</p><h2 data-reveal="heading" className="section-title">よくあるご質問</h2><div className="mt-7">{[['内容がまとまっていなくても相談できますか？', 'はい。目的やお困りごとから伺い、情報の整理から一緒に進めます。'], ['制作期間はどのくらいですか？', '内容やボリュームに応じてご案内します。ご希望の公開日・納期をお知らせください。'], ['オンラインでの相談は可能ですか？', 'オンラインでのお打ち合わせに対応しています。進め方はご相談のうえ決定します。']].map(([q,a]) => <details key={q} className="border-b border-neutral-200 py-5"><summary className="cursor-pointer text-xs leading-7">{q}</summary><p className="mt-4 text-xs leading-7 text-neutral-500">{a}</p></details>)}</div></section>
      <section id="contact" className="detail-section pb-16"><p className="eyebrow">06 / CONTACT</p><h2 data-reveal="heading" className="section-title">次の「伝わる」を、一緒に。</h2><p data-reveal="fade" data-delay="130" className="body-copy">制作のご相談・ご依頼は、メールまたは各SNSよりお気軽にお問い合わせください。</p>
        <p className="mt-4 text-xs leading-7 tracking-wide text-neutral-500">稼働時間 / BUSINESS HOURS：9:00〜18:00</p>
        <div className="mt-8 border-t border-neutral-200">
          {[
            { label: 'EMAIL', name: 'sazanamitokyo1@gmail.com', href: 'mailto:sazanamitokyo1@gmail.com' },
            { label: 'X', name: '@sazanami_zukai', href: 'https://x.com/sazanami_zukai' },
            { label: 'INSTAGRAM', name: '@sazanamitokyo', href: 'https://www.instagram.com/sazanamitokyo/?hl=ja' },
          ].map(({ label, name, href }) => <a key={label} href={href} {...(label !== 'EMAIL' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-neutral-200 py-6 transition-colors hover:bg-neutral-100">
            <span className="w-20 text-[10px] tracking-[.15em] text-neutral-500">{label}</span>
            <span className="min-w-0 flex-1 break-words text-xs leading-6 sm:text-sm">{name}</span>
            <span aria-hidden="true" className="text-neutral-400 transition-transform group-hover:translate-x-1">{label === 'EMAIL' ? '→' : '↗'}</span>
            {label !== 'EMAIL' && <span className="sr-only">（新しいタブで開きます）</span>}
          </a>)}
        </div></section>
      <footer className="flex justify-between border-t border-neutral-200 py-7 text-[9px] tracking-widest text-neutral-400"><span>SAZANAMI TOKYO</span><a href="#">BACK TO TOP ↑</a></footer>
    </main>
  </>;
}
