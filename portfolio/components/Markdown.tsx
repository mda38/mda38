import type { ComponentPropsWithoutRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

type Props = {
  markdown: string;
  className?: string;
};

const joinClassName = (base: string, incoming?: string) => {
  return incoming ? `${base} ${incoming}` : base;
};

const processor = unified().use(remarkParse).use(remarkRehype);

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      className={joinClassName("mt-8 mb-4 text-3xl font-bold", props.className)}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className={joinClassName("mt-8 mb-3 text-md", props.className)}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className={joinClassName("mt-6 mb-2 text-sm", props.className)}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className={joinClassName(
        "my-4 text-neutral-300 text-sm leading-7",
        props.className,
      )}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className={joinClassName("my-4 list-disc pl-6", props.className)}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className={joinClassName(
        "my-4 list-decimal pl-6 leading-7",
        props.className,
      )}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      {...props}
      className={joinClassName(
        "my-1 text-sm text-neutral-300 leading-7",
        props.className,
      )}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className={joinClassName(
        "underline underline-offset-2 text-neutral-300 text-sm decoration-neutral-500 hover:decoration-neutral-200",
        props.className,
      )}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className={joinClassName(
        "my-4 border-l border-neutral-600 pl-4 text-neutral-300",
        props.className,
      )}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className={joinClassName(
        "my-4 overflow-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100",
        props.className,
      )}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className={joinClassName(
        "rounded bg-neutral-900 px-1 mx-0.5 py-0.5 font-mono text-[0.95em] text-neutral-300",
        props.className,
      )}
    />
  ),
} as const;

export default function Markdown({ markdown, className }: Props) {
  const mdast = processor.parse(markdown);
  const hast = processor.runSync(mdast) as Root;

  return (
    <div className={joinClassName("markdown", className)}>
      {toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        components,
      })}
    </div>
  );
}
