import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-neutral-800/10">
      <div className="min-h-screen bg-neutral-950 border-x border-neutral-900 py-6 mx-4 md:mx-auto md:max-w-3xl">
        <section>
          <h2 className="text-xs border-y border-neutral-900 py-2 px-3 text-neutral-500 font-mono">
            <span className="bg-teal-950 text-teal-500 px-1 border-dashed border border-teal-800 ">
              Engineering Notes
            </span>
          </h2>
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
                  <span className="font-mono text-xs text-neutral-500">
                    {post.frontmatter.updated}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
