# kanshoku

個人の制作物や活動履歴を、年ごとに並べて見せるポートフォリオサイトです。

## 目的

- フロントエンド開発の実績や活動を一覧で見せる
- 投稿やコントリビュートなどの履歴を、あとからデータ差し替えしやすい形で管理する
- デザインはシンプルに保ちつつ、年別のタイムラインとして読みやすくする

## 表示要件

- トップページに自己紹介用のテキストを表示する
- `feed.json` の内容を年ごとにグルーピングして表示する
- 各 feed 項目は以下を表示する
  - 種別アイコン
  - 説明文
  - 投稿日
  - タイトル
  - サービスアイコン
  - サービスのホスト名
- 投稿日は `Jul 18` のように月名と日だけを表示する
- 年の見出しは `2026` のように表示する
- 各項目は外部リンクとして開く

## データ要件

`src/app/feed.json` で feed を管理する。

```ts
type Data = {
  type: "write" | "contribute";
  icon: "zenn" | "sizu" | "github";
  title: string;
  description: string;
  url: string;
  publishedAt: string;
};
```

### フィールドの意味

- `type`
  - `write`: 記事執筆などの発信
  - `contribute`: 外部リポジトリやサービスへの貢献
- `icon`
  - 左側に表示する種別アイコンを決める
  - `write` は `public/write.svg`
  - `contribute` は `public/contribute.svg`
- `title`
  - feed カードのメインタイトル
- `description`
  - 一覧上部に表示する短い説明文
- `url`
  - クリック時に開く外部リンク
- `publishedAt`
  - `YYYY-MM-DD` 形式の日付
  - 表示時は UTC 基準で変換する

## アイコン要件

`public/` にある SVG を使い分ける。

- `public/write.svg`
- `public/contribute.svg`
- `public/zenn.svg`
- `public/sizu.svg`
- `public/github.svg`

### 役割

- `write.svg` と `contribute.svg` は feed の `type` に応じて表示する
- `zenn.svg` / `sizu.svg` / `github.svg` は feed の `icon` に応じて表示する

## 実装ルール

- feed データはコードにベタ書きせず、`feed.json` から読み込む
- 年ごとのグルーピングは画面側で行う
- `publishedAt` の表示はタイムゾーン差でズレないように UTC 基準で処理する
- 画像表示には `next/image` を使う

## 開発メモ

- `npm run lint` で静的チェックを行う
- 表示内容を増やすときは `feed.json` に項目を追加すればよい
- 今後管理項目が増えた場合は、`feed.json` から `feed.ts` や CMS に移行する余地がある

