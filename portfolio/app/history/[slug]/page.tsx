import { getLogBySlug } from "@/lib/log";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function HistoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const log = await getLogBySlug(slug);
  if (!log) notFound();

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-xl">
        <Link href="/history" className="text-sm text-neutral-500 underline">
          Back
        </Link>

        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          <h1 className="text-xl font-semibold tracking-tight">
            {log.frontmatter.title ?? slug}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            {log.dateLabel ? (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                {log.dateLabel}
              </span>
            ) : null}
            {log.relativeLabel ? (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                {log.relativeLabel}
              </span>
            ) : null}
            {log.frontmatter.type ? (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                {String(log.frontmatter.type)}
              </span>
            ) : null}
          </div>

          <div
            className="mt-6 leading-7 text-neutral-800"
            dangerouslySetInnerHTML={{ __html: log.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
