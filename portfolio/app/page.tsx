import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="px-4 py-6">
      <section>
        <h2 className="text-sm text-neutral-200">執筆</h2>
        <ul className="list-disc pl-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-sky-500 text-sm underline"
              >
                {post.frontmatter.title ?? post.slug}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/posts" className="underline">
            すべて見る
          </Link>
          <Link href="/history" className="underline">
            history
          </Link>
        </div>
      </section>
      <section>
        <h2 className="text-sm text-neutral-200">日記</h2>
      </section>
    </div>
  );
}
