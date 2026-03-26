import "server-only";
import { createHighlighter } from "shiki";
import type { BuiltinTheme } from "shiki";
import type { ShikiTransformer } from "shiki";

export const SHIKI_THEME: BuiltinTheme = "poimandres";

export const SHIKI_LANGS = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "diff",
  "dockerfile",
  "go",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "markdown",
  "mdx",
  "php",
  "python",
  "ruby",
  "rust",
  "sql",
  "swift",
  "toml",
  "tsx",
  "typescript",
  "xml",
  "yaml",
] as const;

export const SHIKI_LANG_ALIAS: Record<string, string> = {
  "c++": "cpp",
  cs: "csharp",
  "c#": "csharp",
  js: "javascript",
  md: "markdown",
  plain: "text",
  plaintext: "text",
  py: "python",
  rb: "ruby",
  shell: "bash",
  sh: "bash",
  ts: "typescript",
  txt: "text",
  yml: "yaml",
  zsh: "bash",
};

export const SHIKI_DEFAULT_LANGUAGE = "typescript";
export const SHIKI_FALLBACK_LANGUAGE = "text";
export const SHIKI_TRANSFORMERS: ShikiTransformer[] = [];

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;

export const getShikiHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [SHIKI_THEME],
      langs: [...SHIKI_LANGS],
    });
  }

  return highlighterPromise;
};
