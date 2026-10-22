# セキュリティ運用

## リポジトリに設定した自動チェック

- Dependabot: npm と GitHub Actions の更新PRを週1回（月曜9時、日本時間）確認。セキュリティ更新PRはGitHub側で有効化すると別途作成されます。
- CI: mainへのPush、main向けPR、毎週月曜9:17（日本時間）、手動実行でテスト・本番ビルド・型チェック。
- Dependency audit: 同じタイミングで全依存関係の `npm audit` を実行。High/Criticalで失敗、Moderate/Lowもログに表示。レジストリへの接続失敗も正常扱いにしません。
- CodeQL: Push・PR・毎週月曜9:43（日本時間）にJavaScript/TypeScriptの拡張セキュリティ解析。Security → Code scanningで結果を確認。検出結果の登録とワークフロー自体の成否は異なり、検出があっても解析ジョブは成功する場合があります。
- ActionsはコミットSHAで固定し、依存更新はPRとしてレビューします。自動マージは設定していません。

新しい依存パッケージのインストール時、ライフサイクルスクリプトが動く可能性があります。PRの内容と配布元を確認してください。CI・解析にはNotionキーやその他の本番シークレットを渡しません。

## 所有者が最初に確認する設定

設定ファイルのPushだけでは、メール通知やGitHubアカウント設定の有効化は保証できません。

1. GitHub → Settings → Notifications で、受信先メールが確認済みか確認。Actionsのメール通知（失敗したワークフローのみでも可）と、Dependabotのセキュリティ通知を有効にします。
2. リポジトリ → Watch → Custom でPull requestsとSecurity alerts（表示される場合）を購読。Code scanningアラートのメール対象・利用可否もGitHubの通知設定で確認します。
3. リポジトリ → Settings → Advanced Security（UIによっては Code security / Code security and analysis）でDependency graph、Dependabot alerts、Dependabot security updatesを有効化します。
4. Secret scanning / Push protection が利用可能なら有効化します。公開・非公開、契約プランにより使える機能が異なります。
5. Actionsが許可されているか、Security → Code scanningに解析結果が登録されたか確認。CodeQLの高度な設定を使用します。既存のDefault setupが有効なら重複実行しないよう設定を調整します。非公開リポジトリではCodeQLの利用に対象プラン・ライセンスが必要な場合があります。
6. Actionsで本番ビルド・解析の初回結果を確認。失敗があれば実行ログから対処します。通知が実際に届くかも初期運用時に確認してください。

この作業環境ではGitHub APIアクセスが制限されており、アカウントの通知設定、リポジトリのセキュリティ設定、GitHub上の初回実行結果、メール配信は確認できていません。

## 通知を受け取ったら

- High/Critical: 影響と修正方法を確認し、優先的に更新PRを検証・反映。
- テスト/ビルド失敗: PRをマージせずログを確認。mainでの失敗なら公開版の状態も確認。
- CodeQL: Securityのアラートを開き、対象コード・影響・誤検知の可能性を確認。
- 低・中程度の依存問題と通常更新: 月次で確認。

## 現在含まれないもの

- 公開URLの死活監視、Vercelの障害・アクセス・利用量通知は別の仕組みです。未設定です。必要なら外部監視サービスで `https://sazanamitokyo-web.vercel.app/` を監視し、受信先メールを検証して有効化してください。
- 攻撃の完全検知、侵入防止の保証、自動復旧、24時間の有人対応は提供しません。
- GitHub Actionsの定期実行は混雑で遅延することがあり、長期間活動がない公開リポジトリではスケジュールが停止する場合もあります。死活監視の代わりにはなりません。

## 初回点検時の修正

Next.js 15.5.28が参照していたPostCSS 8.4.31に対する依存監査の指摘を受け、`package.json` のoverridesで同じ8系の修正版 `^8.5.31` に統一しました。Next.jsのメジャーアップグレードを強制せずに適用し、監査・テスト・ビルドで検証します。将来Next.jsが要求するPostCSSの互換性が変わった場合はoverrideも再確認してください。

## 顧客向けの紹介文例

「GitHub Actionsによるビルド・テストと静的セキュリティ解析、依存ライブラリの脆弱性チェック・更新PR作成の自動化を導入。通知先の設定により、検出内容を確認して修正する運用に対応します。」

本番での初回実行・通知受信の確認後に、その確認範囲を実績として説明してください。
