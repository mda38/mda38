import { getAllPosts, getPostBySlug } from "@/lib/markdown";
import Markdown from "@/components/Markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <div className="min-h-screen bg-neutral-950 border-x border-neutral-900 md:mx-auto md:max-w-3xl">
      <article>
        <div className="px-3 py-4 border-b border-neutral-900">
          <Link href="/" className="text-neutral-500 text-xs font-mono">
            Back to home
          </Link>
          <div className="mt-4">
            <h1 className="text-lg">{frontmatter.title}</h1>
            <span className="font-mono text-xs text-neutral-500">
              {frontmatter.updated}
            </span>
          </div>
        </div>
        <div className="px-3">
          <Markdown markdown={content} />
        </div>
      </article>
    </div>
  );
}
