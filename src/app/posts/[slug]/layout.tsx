import { getPostBySlug } from "@/lib/markdown";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post?.frontmatter.title ?? slug,
  };
}

export default function PostDetailLayout({ children }: LayoutProps) {
  return <div className="px-3">{children}</div>;
}
