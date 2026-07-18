"use client";

export function Footer() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="flex justify-end mb-2 mx-6">
        <nav aria-label="ページ内ナビゲーション">
          <button
            type="button"
            className="text-sm cursor-pointer"
            onClick={handleClick}
          >
            Page Top ↑
          </button>
        </nav>
      </div>
      <div className="py-6 border-t border-neutral-200 flex flex-col items-center">
        <small className="text-neutral-400">
          ©{" "}
          <time dateTime={String(new Date().getFullYear())}>
            {new Date().getFullYear()}
          </time>{" "}
          largearth. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
