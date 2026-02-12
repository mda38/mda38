import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default function PostListPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.frontmatter.title ?? post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
