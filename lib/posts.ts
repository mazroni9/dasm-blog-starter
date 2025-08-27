// lib/posts.ts
import type { Post } from "@/app/components/PostList";

const DUMMY_POSTS: (Post & { content?: string })[] = [
  {
    slug: "hello-world",
    title: "أول تدوينة — Hello World",
    date: "2025-08-28",
    excerpt: "هذه تدوينة تجريبية لاختبار بنية المدونة.",
    content:
      "<p>مرحبًا بك في المدونة. هذا المحتوى تجريبي. لاحقًا نربطه بملفات Markdown.</p>",
  },
  {
    slug: "second-post",
    title: "تدوينة ثانية",
    date: "2025-08-29",
    excerpt: "مثال على تدوينة ثانية في النظام.",
    content:
      "<p>هذا مثال آخر للتأكد أن النظام يعرض أكثر من مقال.</p>",
  },
];

export async function getAllPosts(): Promise<Post[]> {
  return DUMMY_POSTS.map(({ content, ...rest }) => rest);
}

export async function getPostBySlug(slug: string) {
  return DUMMY_POSTS.find((p) => p.slug === slug);
}
