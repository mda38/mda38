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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, html } = post;

  return (
    <article>
      <div className="pt-6 pb-3 border-b border-neutral-900">
        <Link href="/" className="text-neutral-500 text-xs font-mono">
          Back to home
        </Link>
        <div className="mt-4">
          <h1 className="text-lg mt-2">{frontmatter.title}</h1>
          <span className="font-mono text-xs text-neutral-500">
            {frontmatter.updated}・{frontmatter.category}
          </span>
        </div>
      </div>
      <div>
        <Markdown html={html} />
      </div>
    </article>
  );
}
