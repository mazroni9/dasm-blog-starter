// app/page.tsx
import { Metadata } from "next";
import PostList from "@/app/components/PostList";
import { getAllPosts, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "المدونة | DASM-e",
  description: "مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية.",
};

export default async function Page() {
  const posts: Post[] = await getAllPosts();

  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">المدونة</h1>
      <p className="text-slate-600 mb-8">
        مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية.
      </p>

      {posts.length ? (
        <PostList posts={posts} />
      ) : (
        <div className="text-slate-500">لا توجد مقالات حتى الآن.</div>
      )}
    </section>
  );
}
