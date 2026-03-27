---
title: Markdown表示確認用サンプル
updated: Mar 27, 2026
category: engineering
description: Markdownコンポーネントで適用している主要HTMLタグの表示確認用サンプルです。
---

このページは、`src/components/Markdown.tsx` で定義した見た目をまとめて確認するためのサンプルです。

## 段落とリンク

通常の段落テキストです。リンク装飾の確認として [Next.js公式サイト](https://nextjs.org/) へのリンクを置いています。

インラインコードの表示例: `npm run dev` と `npm run build`。

## 箇条書き

- 箇条書き1: APIレスポンスの型を定義する
- 箇条書き2: 画面表示用にデータを整形する
- 箇条書き3: エラー時の表示を統一する

## 番号付きリスト

1. 要件を言語化する
2. 実装範囲を決める
3. テスト観点を先に決める

## 引用

> この引用ブロックは、`blockquote` の見た目確認用です。

## コードブロック

```ts
export const sum = (a: number, b: number) => {
  return a + b;
};

console.log(sum(2, 3));
```

---

## 画像

以下はMarkdown記法の画像です。

![Markdown画像サンプル](/frontend-test/1.png)

以下は生HTMLの画像です（幅・高さ指定あり）。

<img src="/frontend-test/2.png" alt="HTML画像サンプル" width="960" height="540" />
