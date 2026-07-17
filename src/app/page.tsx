import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import Image from "next/image";

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
  const posts = getAllPosts();

  return (
    <>
      <section>
        <p className="font-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
          dolorum sed amet fugit porro voluptate aspernatur doloribus incidunt!
          Velit fugit non aliquid alias, vel quaerat facere! Eveniet, adipisci?
          Iure, recusandae?
        </p>
        <p className="font-medium">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum aut odio
          magni ipsa non laboriosam qui numquam, suscipit ipsum? Eius, soluta
          culpa asperiores libero in tenetur! Rem eius voluptatibus
          necessitatibus?
        </p>
      </section>
      <section className="mt-20">
        <div className="font-medium mb-10">2026</div>
        <div className="flex gap-x-2">
          <div className="size-6 flex items-center justify-center relative">
            📚
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Published a post on zenn.dev
              </div>
              <div className="text-xs bg-neutral-100 rounded py-px px-1 text-neutral-400 font-medium">
                Nov 12, 2026
              </div>
            </div>
            <div className="border border-neutral-100 rounded-2xl p-4">
              <div className="font-semibold text-sm">Nani翻訳の技術的な話</div>
              <div className="flex items-center gap-x-2 mt-2">
                <div className="">
                  <Image
                    src="/logo-only.svg"
                    alt="zenn logo"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="font-medium text-xs">zenn.dev</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-x-2">
          <div className="size-6 flex items-center justify-center relative">
            📚
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Published a post on zenn.dev
              </div>
              <div className="text-xs bg-neutral-100 rounded py-px px-1 text-neutral-400 font-medium">
                Nov 12, 2026
              </div>
            </div>
            <div className="border border-neutral-100 rounded-2xl p-4">
              <div className="font-semibold text-sm">Nani翻訳の技術的な話</div>
              <div className="flex items-center gap-x-2 mt-2">
                <div className="">
                  <Image
                    src="/logo-only.svg"
                    alt="zenn logo"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="font-medium text-xs">zenn.dev</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
