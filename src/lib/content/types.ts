export type PostFormat = "md" | "mdx";

export type PostFrontmatter = {
  title?: string;
  date?: string;
  updated?: string;
  category?: string;
  [key: string]: unknown;
};

export type PostSummary = {
  slug: string;
  format: PostFormat;
  frontmatter: PostFrontmatter;
};

export type PostDetail = {
  slug: string;
  format: PostFormat;
  frontmatter: PostFrontmatter;
  html: string;
};
