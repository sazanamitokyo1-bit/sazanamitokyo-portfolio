import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SAZANAMI TOKYO — Information & Diagram Design', description: '複雑をほどき、伝わるかたちへ。情報設計・図解デザイナー SAZANAMI TOKYO のポートフォリオ。' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
