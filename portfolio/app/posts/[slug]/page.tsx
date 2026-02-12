import { getPostBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, contentHtml } = post;

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
