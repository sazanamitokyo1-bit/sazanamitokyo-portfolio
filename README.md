# SAZANAMI TOKYO

情報設計・図解デザイナー向けポートフォリオ。Next.js 15 App Router / React 19 / Tailwind CSS 4 / TypeScript。Node.js 22 以上を推奨（検証環境: Node.js 24）。

## 開発・検証

```sh
npm ci --cache /tmp/sazanami-npm-cache
npm run dev
```

```sh
npm test
npm run build
npm run typecheck
npm start
```

## 掲載作品

作品画像を `public/works/` に同梱しています。Notion の認証情報は不要です。Vercel に以前の Notion 環境変数が残っていても、現在の作品一覧には影響しません。

`src/lib/portfolio.ts` がタイトル、カテゴリ、画像、掲載順の管理元です。掲載順はスライド2作品、Instagram1作品、X図解3作品。全6作品・18画像で、すべて架空案件の自主制作として表記し、クライアント名は表示しません。作品ごとの「作品画像を見る」で全画像を表示し、画像を選ぶと原寸ファイルを新しいタブで開けます。サムネイルは切り抜かず全体を表示します。

追加・変更時は画像と `portfolio.ts` を更新し、コミット・Pushしてください。Vercel の Git 連携が有効なら再デプロイされます。元のSVGサンプルは参照資料として残していますが、公開ページには表示しません。

## ファイル構成

- `src/app/page.tsx`: 作品一覧、ABOUT、SERVICES & FEES、PROCESS、FAQ、CONTACT
- `src/app/layout.tsx`: 日本語設定・SEOメタデータ
- `src/app/globals.css`: レスポンシブレイアウトとTailwind
- `src/lib/portfolio.ts`: 掲載作品データ
- `src/components/work-gallery.tsx`: 全作品・各作品の画像一覧
- `src/components/work-image.tsx`: サムネイルと画像エラー表示
- `public/works/`: 掲載画像
- `src/lib/notion.ts`: 以前のNotion取得処理（現在のページでは未使用）
- `tests/`: Notion処理および掲載作品データのテスト

Notion連携を将来再利用する場合は `getWorks()` をページから呼び出すように変更し、`NOTION_API_KEY` と `NOTION_DATABASE_ID` を安全に設定してください。データベースは Title（タイトル）、Category（セレクト等）、Client（テキスト）、Image（ファイルまたはURL）、Published（チェックボックス）、Order（数値）が必要です。APIキーをコミットしないでください。

CONTACT にはメール・X・Instagram へのリンクを掲載しています。連絡先の編集は `src/app/page.tsx` で行います。ABOUT・サービス・制作プロセス・FAQ は公開前に内容をご確認ください。Vercelの Framework Preset は Next.js、Root Directory はリポジトリ直下、各コマンドと出力先は標準設定を使用します。

## 自動チェックと通知

GitHub ActionsでPush/PR/毎週のビルド・テスト・依存監査・CodeQLを実行し、Dependabotが更新PRを作成します。メール通知には所有者のGitHub設定が必要です。[セキュリティ運用手順](docs/security-operations.md)を参照してください。公開サイトの死活監視は未設定です。
