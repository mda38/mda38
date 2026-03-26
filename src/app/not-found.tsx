import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-dashed border-neutral-800 bg-neutral-950/20 p-6">
        <p className="font-mono text-xs text-neutral-500">404 Not Found</p>
        <h1 className="mt-2 text-lg">ページが見つかりませんでした</h1>
        <p className="mt-2 text-sm text-neutral-700">
          URLが間違っているか、記事が移動または削除された可能性があります。
        </p>
        <div className="mt-5 flex gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-mono border border-neutral-800 hover:bg-neutral-900/40"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
