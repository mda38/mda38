import fs from "fs";
import path from "path";
import matter from "gray-matter";

const logsDirectory = path.join(process.cwd(), "log");

type LogFrontmatter = {
  title?: string;
  date?: string;
  type?: string;
  [key: string]: unknown;
};

type LogSummary = {
  slug: string;
  frontmatter: LogFrontmatter;
  dateMs: number | null;
  dateLabel: string | null;
};

const tryParseDate = (value: string | undefined): number | null => {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : ms;
};

const tryParseDateFromSlug = (slug: string): number | null => {
  const iso = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return tryParseDate(`${iso[1]}-${iso[2]}-${iso[3]}`);

  const compact = slug.match(/^(\d{4})(\d{2})(\d{2})/);
  if (compact) return tryParseDate(`${compact[1]}-${compact[2]}-${compact[3]}`);

  return null;
};

const formatDateLabel = (ms: number): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(ms));
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

const resolveLogDateMs = (slug: string, frontmatter: LogFrontmatter, fullPath: string): number | null => {
  const fromFrontmatter = tryParseDate(frontmatter.date);
  if (fromFrontmatter !== null) return fromFrontmatter;

  const fromSlug = tryParseDateFromSlug(slug);
  if (fromSlug !== null) return fromSlug;

  try {
    return fs.statSync(fullPath).mtimeMs;
  } catch {
    return null;
  }
};

const getAllLogs = (): LogSummary[] => {
  if (!fs.existsSync(logsDirectory)) return [];

  const entries = fs.readdirSync(logsDirectory, { withFileTypes: true });

  const logs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/i, "");
      const fullPath = path.join(logsDirectory, entry.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const frontmatter = data as LogFrontmatter;
      const dateMs = resolveLogDateMs(slug, frontmatter, fullPath);

      return {
        slug,
        frontmatter,
        dateMs,
        dateLabel: dateMs === null ? null : formatDateLabel(dateMs),
      };
    })
    .sort((a, b) => {
      if (a.dateMs !== null && b.dateMs !== null) return b.dateMs - a.dateMs;
      if (a.dateMs !== null) return -1;
      if (b.dateMs !== null) return 1;

      return b.slug.localeCompare(a.slug, "ja");
    });

  return logs;
};

const getLogBySlug = async (slug: string) => {
  if (!slug) return null;

  const normalizedSlug = slug.replace(/\.md$/i, "");
  if (path.basename(normalizedSlug) !== normalizedSlug) return null;

  const fullPath = path.join(logsDirectory, `${normalizedSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as LogFrontmatter;
  const dateMs = resolveLogDateMs(normalizedSlug, frontmatter, fullPath);

  return {
    slug: normalizedSlug,
    frontmatter,
    dateMs,
    dateLabel: dateMs === null ? null : formatDateLabel(dateMs),
    relativeLabel: dateMs === null ? null : formatRelativeTime(dateMs),
    content,
  };
};

export { getAllLogs, getLogBySlug };
