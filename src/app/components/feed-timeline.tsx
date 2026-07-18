import Image from "next/image";
import type { Resource } from "../resources";

const typeIconMap: Record<Resource["type"], string> = {
  write: "/write.svg",
  contribute: "/contribute.svg",
};

const iconSrcMap: Record<Resource["icon"], string> = {
  zenn: "/zenn.svg",
  sizu: "/sizu.svg",
  github: "/github.svg",
};

const iconAltMap: Record<Resource["icon"], string> = {
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

const groupFeedByYear = (items: Resource[]) => {
  const grouped = items.reduce<Map<string, Resource[]>>((acc, item) => {
    const year = new Date(`${item.publishedAt}T00:00:00Z`)
      .getUTCFullYear()
      .toString();
    const current = acc.get(year) ?? [];

    acc.set(year, [...current, item]);

    return acc;
  }, new Map<string, Resource[]>());

  return [...grouped.entries()].sort(([a], [b]) => Number(b) - Number(a));
};

type FeedTimelineProps = {
  items: Resource[];
};

export function FeedTimeline({ items }: FeedTimelineProps) {
  const feedByYear = groupFeedByYear(items);

  return (
    <section className="mt-20">
      {feedByYear.map(([year, yearItems]) => (
        <div key={year} className="mb-10 last:mb-0">
          <div className="font-medium mb-10">{year}</div>
          <div className="flex flex-col">
            {yearItems.map((item) => {
              const host = new URL(item.url).hostname;

              return (
                <div className="relative" key={item.id}>
                  <div className="absolute left-2.5 top-7 h-28 w-px border-l border-dashed border-neutral-200" />
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
                        className="border border-neutral-200 rounded-xl p-4"
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
  );
}
