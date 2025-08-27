import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

export type Post = {
  slug: string;
  title: string;
  date: string;
  html: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"));
  const posts: Post[] = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);
    const html = marked.parse(content) as string;
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      html,
    };
  });
  // sort newest first
  posts.sort((a,b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const file = path.join(contentDir, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    html,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  return fs.readdirSync(contentDir).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""));
}
