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
    title: "サンプル技術ブログ",
    description: "Published a post on zenn.dev",
    url: "https://sizu.me/3d41/posts/b9eb41o8ome7",
    publishedAt: "2026-07-18",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントのタイプミスを修正",
    description: "Merged a pull request into reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/pull/946",
    publishedAt: "2026-06-18",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "サンプルコントリビュート",
    description: "Published a post on zenn.dev",
    url: "https://github.com/largearth/todos",
    publishedAt: "2026-11-12",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "サンプルコントリビュート",
    description: "Published a post on zenn.dev",
    url: "https://github.com/largearth/todos",
    publishedAt: "2025-11-12",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "サンプルコントリビュート",
    description: "Published a post on zenn.dev",
    url: "https://github.com/largearth/todos",
    publishedAt: "2025-11-12",
  },
  {
    id: randomUUID(),
    type: "contribute",
    icon: "github",
    title: "ドキュメントのタイポミスを報告",
    description: "Opened an issue in reactjs/ja.react.dev",
    url: "https://github.com/reactjs/ja.react.dev/issues/742",
    publishedAt: "2024-03-27",
  }
];
