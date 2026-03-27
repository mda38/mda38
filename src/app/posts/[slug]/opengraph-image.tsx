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
  const normalizedTitle = title.replace(/\s+/g, " ").trim();
  const titleFontSize =
    normalizedTitle.length > 80 ? 42 : normalizedTitle.length > 48 ? 52 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 15% 20%, #34d399 0%, #111827 38%, #020617 100%)",
          color: "#ecfeff",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 630,
            width: 630,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 34,
              letterSpacing: "-0.02em",
              opacity: 0.9,
            }}
          >
            kanshoku
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              width: "100%",
              textWrap: "balance",
              overflow: "hidden",
            }}
          >
            {normalizedTitle}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
