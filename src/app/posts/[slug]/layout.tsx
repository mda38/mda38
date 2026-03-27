import { getPostBySlug } from "@/lib/markdown";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

type LayoutProps = {
  children: React.ReactNode;
};

const siteName = "kanshoku";
const siteDescription = "フロントエンド開発の知見をまとめるポートフォリオサイトです。";

const toTrimmedString = (value: unknown) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = toTrimmedString(post?.frontmatter.title) || slug;
  const frontmatterDescription = toTrimmedString(post?.frontmatter.description);
  const description =
    frontmatterDescription ||
    `${title}に関する記事です。${siteDescription}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      siteName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function PostDetailLayout({ children }: LayoutProps) {
  return <div className="px-3">{children}</div>;
}
