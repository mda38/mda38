import type { Metadata } from "next";
import { FeedTimeline } from "./components/feed-timeline";
import { IntroSection } from "./components/intro-section";
import { resources } from "./resources";

const homeTitle = "kanshoku";
const homeDescription =
  "フロントエンド開発の知見をまとめるポートフォリオサイトです。";

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "kanshoku",
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default async function Home() {
  return (
    <>
      <IntroSection />
      <FeedTimeline items={resources} />
    </>
  );
}
