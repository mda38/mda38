import { randomUUID } from "crypto";

export type Resource = {
  id: string;
  type: "write" | "contribute";
  icon: "zenn" | "sizu" | "github";
  title: string;
  description: string;
  url: string;
  publishedAt: string;
};

export const resources: Resource[] = [
  {
    id: randomUUID(),
    type: "write",
    icon: "zenn",
    title: "ブラウザレンダリングを簡単に理解する",
    description: "Published a post on zenn.dev",
    url: "https://zenn.dev/islaree/articles/dfa5a75d42e50e",
    publishedAt: "2026-07-18",
  },
  {
    id: randomUUID(),
    type: "write",
    icon: "sizu",
    title: "コンポーネント設計を見つめ直す",
    description: "Published a post on size.me",
    url: "https://sizu.me/3d41/posts/9hx4r8rboe1b",
    publishedAt: "2026-07-26",
  },
    {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントの誤字を修正",
    description: "Merged a pull request into reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/pull/948",
    publishedAt: "2026-06-20",
  },
    {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントの誤字を修正",
    description: "Merged a pull request into reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/pull/947",
    publishedAt: "2026-06-19",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントの誤字を修正",
    description: "Merged a pull request into reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/pull/946",
    publishedAt: "2026-06-18",
  },
    {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントの誤字を報告",
    description: "Opened an issue in reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/issues/945",
    publishedAt: "2026-06-18",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントの誤字を報告",
    description: "Opened an issue in reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/issues/742",
    publishedAt: "2024-03-27",
  }
];
