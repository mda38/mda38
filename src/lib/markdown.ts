import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

type PostFrontmatter = {
  title?: string;
  date?: string;
  updated?: string;
  category?: string;
  [key: string]: unknown;
};

type PostSummary = {
  slug: string;
  frontmatter: PostFrontmatter;
};

const getAllPosts = (): PostSummary[] => {
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const posts = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/i, "");
      const fullPath = path.join(postsDirectory, entry.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
      };
    })
    .sort((a, b) => {
      const aTitle = (a.frontmatter.title ?? a.slug).toString();
      const bTitle = (b.frontmatter.title ?? b.slug).toString();
      return aTitle.localeCompare(bTitle, "ja");
    });

  return posts;
};

const getPostBySlug = (slug: string) => {
  if (!slug) return null;

  const normalizedSlug = slug.replace(/\.md$/i, "");
  if (path.basename(normalizedSlug) !== normalizedSlug) return null;

  const fullPath = path.join(postsDirectory, `${normalizedSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
};

export { getAllPosts, getPostBySlug };
