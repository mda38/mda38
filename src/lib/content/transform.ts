import "server-only";
import rehypeShiki from "@shikijs/rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import {
  getShikiHighlighter,
  SHIKI_DEFAULT_LANGUAGE,
  SHIKI_FALLBACK_LANGUAGE,
  SHIKI_LANG_ALIAS,
  SHIKI_LANGS,
  SHIKI_THEME,
  SHIKI_TRANSFORMERS,
} from "@/lib/content/shiki";
import type { PostFormat } from "@/lib/content/types";

const createProcessor = async (format: PostFormat) => {
  const highlighter = await getShikiHighlighter();

  const processor = unified().use(remarkParse).use(remarkGfm);

  if (format === "mdx") {
    processor.use(remarkMdx);
  }

  return processor
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki, {
      highlighter,
      theme: SHIKI_THEME,
      langs: [...SHIKI_LANGS],
      langAlias: SHIKI_LANG_ALIAS,
      defaultLanguage: SHIKI_DEFAULT_LANGUAGE,
      fallbackLanguage: SHIKI_FALLBACK_LANGUAGE,
      transformers: SHIKI_TRANSFORMERS,
      addLanguageClass: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true });
};

export const transformPostContentToHtml = async (
  source: string,
  format: PostFormat,
) => {
  const processor = await createProcessor(format);
  const file = await processor.process(source);

  return String(file);
};
