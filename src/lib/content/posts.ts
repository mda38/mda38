import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { transformPostContentToHtml } from "@/lib/content/transform";
import type {
  PostDetail,
  PostFormat,
  PostFrontmatter,
  PostSummary,
} from "@/lib/content/types";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const postExtensions = [".mdx", ".md"] as const;

const getPostFormatFromFileName = (fileName: string): PostFormat | null => {
  if (fileName.endsWith(".mdx")) return "mdx";
  if (fileName.endsWith(".md")) return "md";
  return null;
};

const stripPostExtension = (fileName: string) => {
  return fileName.replace(/\.mdx?$/i, "");
};

const isSafeSlug = (slug: string) => {
  return path.basename(slug) === slug;
};

const findPostFileBySlug = (slug: string) => {
  for (const extension of postExtensions) {
    const fullPath = path.join(postsDirectory, `${slug}${extension}`);
    if (!fs.existsSync(fullPath)) continue;

    const format = extension === ".mdx" ? "mdx" : "md";
    return { fullPath, format } as const;
  }

  return null;
};

export const getAllPosts = (): PostSummary[] => {
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const postMap = new Map<string, PostSummary>();

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const format = getPostFormatFromFileName(entry.name);
    if (!format) continue;

    const slug = stripPostExtension(entry.name);
    const fullPath = path.join(postsDirectory, entry.name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const existing = postMap.get(slug);
    if (existing && existing.format === "mdx") continue;

    postMap.set(slug, {
      slug,
      format,
      frontmatter: data as PostFrontmatter,
    });
  }

  return [...postMap.values()].sort((a, b) => {
    const aTitle = (a.frontmatter.title ?? a.slug).toString();
    const bTitle = (b.frontmatter.title ?? b.slug).toString();
    return aTitle.localeCompare(bTitle, "ja");
  });
};

export const getPostBySlug = async (slug: string): Promise<PostDetail | null> => {
  if (!slug) return null;

  const normalizedSlug = stripPostExtension(slug);
  if (!isSafeSlug(normalizedSlug)) return null;

  const target = findPostFileBySlug(normalizedSlug);
  if (!target) return null;

  const fileContents = fs.readFileSync(target.fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const html = await transformPostContentToHtml(content, target.format);

  return {
    slug: normalizedSlug,
    format: target.format,
    frontmatter: data as PostFrontmatter,
    html,
  };
};
