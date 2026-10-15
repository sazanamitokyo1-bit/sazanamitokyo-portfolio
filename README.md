# SAZANAMI TOKYO

情報設計・図解デザイナー向けポートフォリオ。Next.js 15 App Router / React 19 / Tailwind CSS 4 / TypeScript。Node.js 22 以上を推奨（検証環境: Node.js 24）。

## 開発

```sh
npm ci
cp .env.example .env.local
npm run dev
```

両方の環境変数が空なら、自主制作のサンプル作品を表示します。一方だけの設定や API エラー時はエラー表示になり、架空の実績へ置き換えません。

## Notion の設定

1. Notion でインテグレーションを作成し、対象データベースに読み取り権限で接続します。
2. `.env.local` またはホスティング先の安全な環境変数設定に `NOTION_API_KEY` と `NOTION_DATABASE_ID` を登録します。キーをコミットしないでください。
3. データベースには次の名前・型のプロパティを作成します（大文字小文字も一致させます）。

| 名前 | 型 |
| --- | --- |
| Title | タイトル |
| Category | セレクト、マルチセレクト、またはテキスト |
| Client | テキスト |
| Image | ファイル＆メディア、または URL |
| Published | チェックボックス |
| Order | 数値 |

`Published = true` のみを `Order` 昇順でサーバーから取得。100 件を超える場合もページ送りします。Image の最初の画像を使い、Notion アップロード画像と外部 HTTPS 画像に対応します。キャッシュを使わずリクエストごとに取得し、Notion 署名付き画像 URL の期限切れを避けます。API キーはサーバー専用で、ブラウザーへ送信しません。API バージョンは database query を提供する `2022-06-28` を明示しています。

## 検証・本番起動

```sh
npm test
npm run build
npm run typecheck
npm start
```

取得処理のテストはモック API によるフィルター・並び順の指定、ページ送り、画像 URL、未設定・空結果・エラー処理を検証します。実際の Notion 接続は認証情報の設定後に別途確認してください。

## ファイル構成

- `src/app/page.tsx`: 作品一覧、ABOUT、SERVICES & FEES、PROCESS、FAQ、CONTACT
- `src/app/layout.tsx`: 日本語設定・SEO メタデータ
- `src/app/globals.css`: レスポンシブレイアウトと Tailwind
- `src/lib/notion.ts`: サーバー専用の Notion 取得・サンプルデータ
- `src/components/work-image.tsx`: 画像表示と読み込み失敗時の代替表示
- `public/works/`: 同梱のオリジナル SVG サンプル
- `tests/notion.test.mjs`: Notion 取得処理テスト

## 公開前の編集

CONTACT は連絡先未提供のため準備中です。`src/app/page.tsx` に実際の窓口を設定してください。ABOUT、サービス、制作プロセス、FAQ は提案文なので公開前に内容をご確認ください。料金は未指定のため個別見積りと表示しています。実際の作品には Notion の公開チェックを入れてください。

Next.js の動的サーバーレンダリングを使うため、Node.js または Next.js 対応ホスティングにデプロイしてください。静的エクスポートには対応しません。実画像の配信元は閲覧者のブラウザーから到達できる必要があります。
