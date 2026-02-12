import Link from "next/link";
import { getAllLogs } from "@/lib/log";

export const dynamic = "force-dynamic";

const iconForType = (type: unknown): string => {
  if (type === "article") return "✍️";
  if (type === "demo") return "🧪";
  if (type === "release") return "🎉";
  if (type === "oss") return "🐙";
  return "📝";
};

const labelForType = (type: unknown): string => {
  if (type === "article") return "Published a log";
  if (type === "demo") return "Shipped a demo";
  if (type === "release") return "Released";
  if (type === "oss") return "New OSS project";
  return "Added a log";
};

const formatRelativeTime = (ms: number, nowMs = Date.now()): string => {
  const deltaSeconds = Math.round((ms - nowMs) / 1000);
  const abs = Math.abs(deltaSeconds);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (abs < 60) return rtf.format(Math.round(deltaSeconds), "second");
  const deltaMinutes = Math.round(deltaSeconds / 60);
  if (Math.abs(deltaMinutes) < 60) return rtf.format(deltaMinutes, "minute");
  const deltaHours = Math.round(deltaSeconds / 3600);
  if (Math.abs(deltaHours) < 24) return rtf.format(deltaHours, "hour");
  const deltaDays = Math.round(deltaSeconds / 86400);
  if (Math.abs(deltaDays) < 30) return rtf.format(deltaDays, "day");
  const deltaMonths = Math.round(deltaSeconds / 2592000);
  if (Math.abs(deltaMonths) < 12) return rtf.format(deltaMonths, "month");
  const deltaYears = Math.round(deltaSeconds / 31536000);
  return rtf.format(deltaYears, "year");
};

export default function HistoryPage() {
  const logs = getAllLogs();

  const groups = new Map<string, typeof logs>();
  for (const log of logs) {
    const year =
      log.dateMs === null ? "Unknown" : String(new Date(log.dateMs).getFullYear());
    const existing = groups.get(year);
    if (existing) existing.push(log);
    else groups.set(year, [log]);
  }

  const groupEntries = [...groups.entries()].sort(([a], [b]) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return Number(b) - Number(a);
  });

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-xl">
        <h1 className="text-sm font-medium text-neutral-500">History</h1>

        <div className="mt-8 space-y-12">
          {groupEntries.map(([year, items]) => (
            <section key={year}>
              <h2 className="text-2xl font-semibold tracking-tight">{year}</h2>

              <div className="relative mt-6">
                <div className="absolute left-3 top-0 h-full w-px border-l border-dashed border-neutral-200" />
                <ul className="space-y-10">
                  {items.map((log) => {
                    const relative =
                      log.dateMs === null ? null : formatRelativeTime(log.dateMs);
                    return (
                      <li key={log.slug} className="relative pl-10">
                        <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
                          <span className="text-sm">
                            {iconForType(log.frontmatter.type)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                          <span>{labelForType(log.frontmatter.type)}</span>
                          {relative ? (
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                              {relative}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={`/history/${log.slug}`}
                          className="mt-3 block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 transition hover:ring-neutral-300"
                        >
                          <div className="text-base font-semibold leading-6">
                            {log.frontmatter.title ?? log.slug}
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                            <span aria-hidden>🗓️</span>
                            <span>{log.dateLabel ?? "No date"}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
