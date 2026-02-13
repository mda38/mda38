import type { ComponentPropsWithoutRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

type Props = {
  markdown: string;
};

const joinClassName = (base: string, incoming?: string) => {
  return incoming ? `${base} ${incoming}` : base;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, {
    themes: {
      light: "light-plus",
      dark: "dark-plus",
    },
  });

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      className={joinClassName("text-2xl font-bold mt-6 mb-3", props.className)}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className={joinClassName(
        "text-xl font-semibold mt-6 mb-2",
        props.className,
      )}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className={joinClassName(
        "text-lg font-semibold mt-5 mb-2",
        props.className,
      )}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className={joinClassName("my-4 leading-7", props.className)}
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
      className={joinClassName("my-4 list-decimal pl-6", props.className)}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className={joinClassName("my-1", props.className)} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className={joinClassName("underline underline-offset-2", props.className)}
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
        "p-4  text-sm bg-neutral-800 rounded-lg text-neutral-200 overflow-auto",
      )}
    />
  ),
} as const;

export default async function Markdown({ markdown }: Props) {
  const mdast = processor.parse(markdown);
  const hast = (await processor.run(mdast)) as Root;

  return (
    <div className="markdown">
      {toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        components,
      })}
    </div>
  );
}
