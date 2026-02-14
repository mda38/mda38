import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

type Props = {
  markdown: string;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype);

export default function Markdown({ markdown }: Props) {
  const mdast = processor.parse(markdown);
  const hast = processor.runSync(mdast) as Root;

  return (
    <div className="markdown">
      {toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
      })}
    </div>
  );
}
