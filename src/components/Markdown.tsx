import Image from "next/image";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import { createElement } from "react";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Props = {
  html: string;
  className?: string;
};

type HastTextNode = {
  type: "text";
  value: string;
};

type HastElementNode = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: HastNode[];
};

type HastRootNode = {
  type: "root";
  children: HastNode[];
};

type HastNode = HastTextNode | HastElementNode;

type MarkdownComponent = (props: Record<string, unknown>) => ReactNode;

type RenderableTag = string | MarkdownComponent;

const joinClassName = (base: string, incoming?: string) => {
  return incoming ? `${base} ${incoming}` : base;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw);

const components: Record<string, MarkdownComponent> = {
  h2: (props) => {
    const h2Props = props as ComponentPropsWithoutRef<"h2">;
    return createElement("h2", {
      ...h2Props,
      className: joinClassName(
        "mt-12 mb-4 text-md text-white",
        h2Props.className,
      ),
    });
  },
  p: (props) => {
    const pProps = props as ComponentPropsWithoutRef<"p">;
    return createElement("p", {
      ...pProps,
      className: joinClassName(
        "my-4 text-sm leading-7 text-neutral-400",
        pProps.className,
      ),
    });
  },
  ul: (props) => {
    const ulProps = props as ComponentPropsWithoutRef<"ul">;
    return createElement("ul", {
      ...ulProps,
      className: joinClassName("my-4 list-disc pl-6", ulProps.className),
    });
  },
  ol: (props) => {
    const olProps = props as ComponentPropsWithoutRef<"ol">;
    return createElement("ol", {
      ...olProps,
      className: joinClassName(
        "my-4 list-decimal pl-6 leading-7",
        olProps.className,
      ),
    });
  },
  li: (props) => {
    const liProps = props as ComponentPropsWithoutRef<"li">;
    return createElement("li", {
      ...liProps,
      className: joinClassName(
        "my-1 text-sm leading-7 text-neutral-400",
        liProps.className,
      ),
    });
  },
  a: (props) => {
    const aProps = props as ComponentPropsWithoutRef<"a">;
    return createElement("a", {
      ...aProps,
      className: joinClassName(
        "text-sm text-neutral-400 underline underline-offset-2 decoration-neutral-500 hover:decoration-neutral-200",
        aProps.className,
      ),
    });
  },
  blockquote: (props) => {
    const blockquoteProps = props as ComponentPropsWithoutRef<"blockquote">;
    return createElement("blockquote", {
      ...blockquoteProps,
      className: joinClassName(
        "my-4 border-l border-neutral-600 pl-4 text-neutral-400",
        blockquoteProps.className,
      ),
    });
  },
  pre: (props) => {
    const preProps = props as ComponentPropsWithoutRef<"pre">;
    return createElement("pre", {
      ...preProps,
      className: joinClassName(
        "my-4 overflow-x-auto rounded-lg bg-neutral-900 border border-neutral-800",
        preProps.className,
      ),
    });
  },
  code: (props) => {
    const codeProps = props as ComponentPropsWithoutRef<"code">;
    return createElement("code", {
      ...codeProps,
      className: joinClassName(
        "mx-0.5 rounded bg-neutral-900 border border-neutral-800 px-1 py-0.5 font-mono text-[0.95em] text-[#e4f0fb]",
        codeProps.className,
      ),
    });
  },
  hr: (props) => {
    const hrProps = props as ComponentPropsWithoutRef<"hr">;
    return createElement("hr", {
      ...hrProps,
      className: joinClassName("border-neutral-800", hrProps.className),
    });
  },
  img: (props) => {
    const { src, alt, width, height, className, sizes, ...rest } =
      props as ComponentPropsWithoutRef<"img">;

    if (!src || typeof src !== "string") return null;

    const parsedWidth =
      typeof width === "number" ? width : Number.parseInt(String(width), 10);
    const parsedHeight =
      typeof height === "number" ? height : Number.parseInt(String(height), 10);
    const hasSize =
      Number.isFinite(parsedWidth) &&
      parsedWidth > 0 &&
      Number.isFinite(parsedHeight) &&
      parsedHeight > 0;

    return createElement(
      "span",
      { className: "my-6 block w-full" },
      createElement(Image, {
        ...rest,
        src,
        alt: alt ?? "",
        width: hasSize ? parsedWidth : 0,
        height: hasSize ? parsedHeight : 0,
        sizes:
          typeof sizes === "string" ? sizes : "(min-width: 768px) 720px, 100vw",
        className: joinClassName("h-auto w-full", className),
        style: !hasSize ? { width: "100%", height: "auto" } : undefined,
      }),
    );
  },
};

const styleKeyToReactKey = (key: string) => {
  if (key.startsWith("--")) return key;
  return key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
};

const parseStyle = (style: string): CSSProperties => {
  const styleObject: Record<string, string> = {};

  for (const rawEntry of style.split(";")) {
    const entry = rawEntry.trim();
    if (!entry) continue;

    const separatorIndex = entry.indexOf(":");
    if (separatorIndex === -1) continue;

    const rawKey = entry.slice(0, separatorIndex).trim();
    const rawValue = entry.slice(separatorIndex + 1).trim();
    if (!rawKey || !rawValue) continue;

    styleObject[styleKeyToReactKey(rawKey)] = rawValue;
  }

  return styleObject as CSSProperties;
};

const normalizeClassName = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item): item is string => typeof item === "string" && item.length > 0,
      )
      .join(" ");
  }

  if (typeof value === "string") return value;
  return undefined;
};

const toReactProps = (properties?: Record<string, unknown>) => {
  const props: Record<string, unknown> = {};
  if (!properties) return props;

  for (const [key, value] of Object.entries(properties)) {
    if (value == null) continue;

    if (key === "className") {
      const className = normalizeClassName(value);
      if (className) props.className = className;
      continue;
    }

    if (key === "style" && typeof value === "string") {
      props.style = parseStyle(value);
      continue;
    }

    props[key] = value;
  }

  return props;
};

const getRenderableTag = (
  tagName: string,
  parentTagName?: string,
): RenderableTag => {
  if (tagName === "code" && parentTagName === "pre") {
    return "code";
  }

  return components[tagName] ?? tagName;
};

const renderNodes = (
  nodes: HastNode[],
  parentTagName?: string,
): ReactNode[] => {
  return nodes.flatMap((node, index) => {
    if (node.type === "text") {
      return node.value;
    }

    if (node.type !== "element") {
      return [];
    }

    const children = renderNodes(node.children, node.tagName);
    const props = toReactProps(node.properties);
    const renderableTag = getRenderableTag(node.tagName, parentTagName);

    return createElement(renderableTag, { key: index, ...props }, ...children);
  });
};

export default function Markdown({ html, className }: Props) {
  const mdast = processor.parse(html);
  const hast = processor.runSync(mdast) as HastRootNode;

  return (
    <div className={joinClassName("markdown text-neutral-400", className)}>
      {renderNodes(hast.children)}
    </div>
  );
}
