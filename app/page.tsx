// app/page.tsx
import { Metadata } from "next";
import PostList, { type Post as PostListPost } from "@/app/components/PostList";
import { getAllPosts, type Post as SourcePost } from "@/lib/posts";

export const metadata: Metadata = {
  title: "المدونة | DASM-e",
  description: "مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية.",
};

// توحيد التاريخ إلى نص YYYY-MM-DD (أو undefined)
function toDateString(value: SourcePost["date"]): string | undefined {
  if (!value) return undefined;
  try {
    if (typeof value === "string") return value;
    if (typeof value === "number") return new Date(value).toISOString().slice(0, 10);
    if (value instanceof Date) return value.toISOString().slice(0, 10);
  } catch {}
  return undefined;
}

export default async function Page() {
  const posts = await getAllPosts();

  // نطابق نوع PostList: نجعل date من نوع string | undefined
  const normalized: PostListPost[] = posts.map((p) => ({
    ...p,
    date: toDateString(p.date),
  })) as PostListPost[];

  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">المدونة</h1>
      <p className="text-slate-600 mb-8">
        مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية.
      </p>

      {normalized.length ? (
        <PostList posts={normalized} />
      ) : (
        <div className="text-slate-500">لا توجد مقالات حتى الآن.</div>
      )}
    </section>
  );
}
