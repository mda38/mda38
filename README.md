## ディレクトリ構成

```
├─ content/ # コンテンツ層（アプリコードとは分離された記事データ）
│ └─ posts/ # ブログ記事のMarkdownを格納するディレクトリ
│ ├─ article-1.md # 記事ファイル（Markdown）
│ └─ article-2.md # 記事ファイル（Markdown）
│
├─ src/ # Next.jsアプリケーションのソースコード
│ ├─ app/ # App Router（ルーティングとページUI）
│ │ └─ posts/ # /posts に対応するルート
│ │ ├─ page.tsx # 記事一覧ページ
│ │ │ # content/posts を読み取り
│ │ │ # 記事リストを表示する
│ │ │
│ │ └─ [slug]/ # 動的ルート（/posts/:slug）
│ │ └─ page.tsx # 個別記事ページ
│ │ # slugからMarkdownを取得して表示
│ │
│ └─ lib/ # データ取得・変換ロジック
│ └─ posts.ts # 記事取得ロジック
│ # - Markdownファイル読み込み
│ # - frontmatter解析
│ # - slug取得
│ # - HTML変換
│
└─ package.json # 依存関係とスクリプト
```
