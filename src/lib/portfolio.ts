import type { Work } from './notion';

export type PortfolioWork = Work & { images: string[] };
// All projects are independently created fictional briefs, not commissioned client work.
export const portfolioWorks: PortfolioWork[] = [
  { id: 'secretary', title: 'オンライン秘書サービスの魅力を伝えるご案内資料', category: 'スライドデザイン', client: '', image: '/works/secretary-01.png', images: ['/works/secretary-01.png', '/works/secretary-02.png', '/works/secretary-03.png', '/works/secretary-04.png'], order: 1 },
  { id: 'learning', title: '学びを小さな一歩につなげる講座スライド', category: 'スライドデザイン', client: '', image: '/works/learning-01.png', images: ['/works/learning-01.png', '/works/learning-02.png'], order: 2 },
  { id: 'organizing', title: '片付けが苦手な人のための整理5STEP', category: 'Instagramフィードデザイン', client: '', image: '/works/organizing-01.png', images: ['/works/organizing-01.png', '/works/organizing-02.png'], order: 3 },
  { id: 'service-strengths', title: '3つの問いでサービスの強みを言語化', category: 'X図解', client: '', image: '/works/service-strengths.png', images: ['/works/service-strengths.png'], order: 4 },
  { id: 'work-habits', title: '仕事が早い人がやっている5つの習慣', category: 'X図解', client: '', image: '/works/work-habits.png', images: ['/works/work-habits.png'], order: 5 },
  { id: 'flower-subscription', title: '花を飾りたい人へ届ける、季節の小さな花便', category: 'X図解', client: '', image: '/works/flower-subscription.png', images: ['/works/flower-subscription.png'], order: 6 },
];
