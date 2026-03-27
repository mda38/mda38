import { getPostBySlug } from "@/lib/markdown";
import { ImageResponse } from "next/og";

export const alt = "kanshoku";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.frontmatter.title?.toString().trim() || slug;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 15% 20%, #34d399 0%, #111827 38%, #020617 100%)",
          color: "#ecfeff",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: "-0.02em",
          }}
        >
          kanshoku
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.9,
              letterSpacing: "-0.01em",
            }}
          >
            Article
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              maxWidth: 1000,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
