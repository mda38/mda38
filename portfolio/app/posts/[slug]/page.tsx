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
    <>
      <Link href="/">←back</Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.updated}</span>
        <Markdown markdown={content} />
      </article>
    </>
  );
}
