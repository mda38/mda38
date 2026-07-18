export type Data = {
  type: "write" | "contribute";
  icon: "zenn" | "sizu" | "github";
  title: string;
  description: string;
  url: string;
  publishedAt: string;
};
