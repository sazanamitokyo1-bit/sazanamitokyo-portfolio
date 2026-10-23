import type { Work } from './notion';

export type PortfolioWork = Work & { images: string[] };
// All projects are independently created fictional briefs, not commissioned client work.
export const portfolioWorks: PortfolioWork[] = [
  { id: 'brand-consulting', title: '小さなお店の魅力を言葉にするブランド相談資料', category: 'スライドデザイン', client: '', image: '/works/brand-consulting-01.png', images: ['/works/brand-consulting-01.png', '/works/brand-consulting-02.png', '/works/brand-consulting-03.png', '/works/brand-consulting-04.png'], order: 1 },
  { id: 'remote-work-seminar', title: '未経験から始める、在宅ワークの第一歩｜セミナー資料', category: 'スライドデザイン', client: '', image: '/works/remote-work-seminar-01.png', images: ['/works/remote-work-seminar-01.png', '/works/remote-work-seminar-02.png', '/works/remote-work-seminar-03.png', '/works/remote-work-seminar-04.png', '/works/remote-work-seminar-05.png', '/works/remote-work-seminar-06.png', '/works/remote-work-seminar-07.png', '/works/remote-work-seminar-08.png', '/works/remote-work-seminar-09.png', '/works/remote-work-seminar-10.png'], order: 2 },
  { id: 'manual-support', title: '経験をチームの力に変える業務マニュアル整備資料', category: 'スライドデザイン', client: '', image: '/works/manual-support-01.png', images: ['/works/manual-support-01.png', '/works/manual-support-02.png', '/works/manual-support-03.png', '/works/manual-support-04.png', '/works/manual-support-05.png', '/works/manual-support-06.png'], order: 3 },
  { id: 'natural-textiles', title: '自然素材のカーテンと寝具の魅力を伝えるフィード', category: 'Instagramフィードデザイン', client: '', image: '/works/natural-textiles-01.png', images: ['/works/natural-textiles-01.png', '/works/natural-textiles-02.png', '/works/natural-textiles-03.png', '/works/natural-textiles-04.png', '/works/natural-textiles-05.png'], order: 4 },
  { id: 'service-strengths', title: '3つの問いでサービスの強みを言語化', category: 'X図解', client: '', image: '/works/service-strengths.png', images: ['/works/service-strengths.png'], order: 5 },
  { id: 'work-habits', title: '仕事が早い人がやっている5つの習慣', category: 'X図解', client: '', image: '/works/work-habits.png', images: ['/works/work-habits.png'], order: 6 },
  { id: 'flower-subscription', title: '花を飾りたい人へ届ける、季節の小さな花便', category: 'X図解', client: '', image: '/works/flower-subscription.png', images: ['/works/flower-subscription.png'], order: 7 },
];
