// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

// نوع البيانات بعد التحويل
export type Post = {
  slug: string;
  title: string;
  date: string;   // ISO
  html: string;
};

// نوع بيانات الـ frontmatter
type FrontMatter = {
  title?: string;
  date?: string | Date;
};

// كاش بسيط في الذاكرة (يفيد في الـ dev والـ serverless أثناء نفس التشغيل)
const _cache: Record<string, Post> = {};

function toISO(d?: string | Date): string {
  if (!d) return new Date().toISOString();
  const dt = typeof d === "string" ? new Date(d) : d;
  return isNaN(dt.getTime()) ? new Date().toISOString() : dt.toISOString();
}

function readMarkdownFile(filePath: string): { data: FrontMatter; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  return { data: parsed.data as FrontMatter, content: parsed.content };
}

export async function getAllPosts(): Promise<Post[]> {
  // اقرأ جميع ملفات .md من مجلد content
  const files = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))
    : [];

  const posts: Post[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");

    // استخدم الكاش إذا موجود
    if (_cache[slug]) {
      posts.push(_cache[slug]);
      continue;
    }

    const full = path.join(contentDir, file);
    const { data, content } = readMarkdownFile(full);
    const html = (marked.parse(content) as string) || "";

    const post: Post = {
      slug,
      title: data.title?.toString() || slug,
      date: toISO(data.date),
      html,
    };

    _cache[slug] = post;
    posts.push(post);
  }

  // الأحدث أولاً
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // من الكاش؟
  if (_cache[slug]) return _cache[slug];

  const file = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(file)) {
    // لو مفقود أعطِ صفحة بسيطة بدل ما نفشل البناء
    return {
      slug,
      title: "المقال غير موجود",
      date: new Date().toISOString(),
      html: `<p>لا يوجد ملف Markdown باسم <code>${slug}.md</code> داخل مجلد <code>content/</code>.</p>`,
    };
  }

  const { data, content } = readMarkdownFile(file);
  const html = (marked.parse(content) as string) || "";

  const post: Post = {
    slug,
    title: data.title?.toString() || slug,
    date: toISO(data.date),
    html,
  };

  _cache[slug] = post;
  return post;
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
