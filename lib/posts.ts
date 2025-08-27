// lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string; // إجباري
  date?: string | Date | number | null;
  excerpt?: string;
  [k: string]: any;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function isMdLike(name: string) {
  return name.endsWith(".md") || name.endsWith(".mdx") || name.endsWith(".markdown");
}

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR).catch(() => []);
  return files.filter(isMdLike).map((f) => f.replace(/\.(md|mdx|markdown)$/i, ""));
}

function toTime(value: Post["date"]): number {
  if (!value) return 0;
  try {
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    const t = Date.parse(value);
    return Number.isNaN(t) ? 0 : t;
  } catch {
    return 0;
  }
}

export function sortPostsByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => toTime(b.date) - toTime(a.date));
}

async function readPostFileBySlug(slug: string): Promise<{ content: string; data: any }> {
  const candidates = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
    path.join(POSTS_DIR, `${slug}.markdown`),
  ];
  for (const full of candidates) {
    try {
      const raw = await fs.readFile(full, "utf8");
      const { content, data } = matter(raw);
      return { content, data };
    } catch {}
  }
  throw new Error(`Post not found for slug: ${slug}`);
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const metas: Post[] = [];

  for (const slug of slugs) {
    try {
      const { data } = await readPostFileBySlug(slug);
      metas.push({
        slug,
        title: data.title ?? slug,     // نضمن وجود عنوان
        date: data.date ?? null,
        excerpt: data.excerpt ?? data.description ?? "",
        ...data,
      });
    } catch {}
  }

  return sortPostsByDateDesc(metas);
}

export async function getPostBySlug(slug: string): Promise<{ meta: Post; content: string }> {
  const { content, data } = await readPostFileBySlug(slug);
  const meta: Post = {
    slug,
    title: data.title ?? slug,         // نضمن وجود عنوان
    date: data.date ?? null,
    excerpt: data.excerpt ?? data.description ?? "",
    ...data,
  };
  return { meta, content };
}
