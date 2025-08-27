// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Post } from "@/app/components/PostList";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? undefined,
      excerpt: (data.excerpt as string) ?? content.slice(0, 140) + "…"
    } as Post;
  });

  // الأحدث أولاً لو فيه تواريخ
  return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? undefined,
    excerpt: (data.excerpt as string) ?? undefined,
    content: contentHtml
  };
}
