import type { Metadata } from "next";
import Image from "next/image";
import feed from "./feed.json";
import type { Data } from "./page.type";

const homeTitle = "kanshoku";
const homeDescription =
  "フロントエンド開発の知見をまとめるポートフォリオサイトです。";
const feedItems = feed as Data[];

const typeIconMap: Record<Data["type"], string> = {
  write: "/write.svg",
  contribute: "/contribute.svg",
};

const iconSrcMap: Record<Data["icon"], string> = {
  zenn: "/zenn.svg",
  sizu: "/sizu.svg",
  github: "/github.svg",
};

const iconAltMap: Record<Data["icon"], string> = {
  zenn: "Zenn logo",
  sizu: "Sizu logo",
  github: "GitHub logo",
};

const formatPublishedAt = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));

const groupFeedByYear = (items: Data[]) => {
  const grouped = items.reduce<Map<string, Data[]>>((acc, item) => {
    const year = new Date(`${item.publishedAt}T00:00:00Z`)
      .getUTCFullYear()
      .toString();
    const current = acc.get(year) ?? [];

    acc.set(year, [...current, item]);

    return acc;
  }, new Map<string, Data[]>());

  return [...grouped.entries()].sort(([a], [b]) => Number(b) - Number(a));
};

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
  const feedByYear = groupFeedByYear(feedItems);

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
        {feedByYear.map(([year, items]) => (
          <div key={year} className="mb-10 last:mb-0">
            <div className="font-medium mb-10">{year}</div>
            <div className="flex flex-col">
              {items.map((item) => {
                const host = new URL(item.url).hostname;

                return (
                  <div className="relative" key={item.publishedAt}>
                    <div className="absolute left-2.5 top-7 h-28 w-px bg-neutral-200" />
                    <div className="flex gap-x-2 pb-10">
                      <div className="size-5 flex items-center justify-center relative">
                        <Image
                          src={typeIconMap[item.type]}
                          alt={`${item.type} icon`}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <div className="flex items-center justify-between gap-x-4">
                          <div className="text-sm font-medium">
                            {item.description}
                          </div>
                          <div className="text-xs bg-neutral-100 rounded-md py-px px-1 text-neutral-400 font-medium whitespace-nowrap">
                            {formatPublishedAt(item.publishedAt)}
                          </div>
                        </div>
                        <a
                          target="_blank"
                          href={item.url}
                          className="border border-neutral-200 rounded-2xl p-4"
                        >
                          <div className="font-semibold text-sm">
                            {item.title}
                          </div>
                          <div className="flex items-center gap-x-2 mt-2">
                            <Image
                              src={iconSrcMap[item.icon]}
                              alt={iconAltMap[item.icon]}
                              width={16}
                              height={16}
                            />
                            <div className="font-medium text-xs">{host}</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
