import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <section>
      <div className="p-3 border-b border-dashed border-neutral-800">
        <h2 className="bg-teal-950 inline text-xs font-mono text-teal-500 px-1 border-dashed border border-teal-800 ">
          Writing
        </h2>
      </div>
      <ul className="divide-y divide-neutral-900">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="flex flex-col gap-y-1 py-4 px-3 rounded-md transition duration-150 ease-out active:scale-[0.99] active:bg-neutral-900/40 active:opacity-90 focus-visible:outline-2 focus-visible:outline-cyan-600/60"
            >
              <span className="text-sm">
                {post.frontmatter.title ?? post.slug}
              </span>
              <div className="flex items-center gap-x-0.5">
                <span className="font-mono text-xs text-neutral-500">
                  {post.frontmatter.updated}・{post.frontmatter.category}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
