// app/page.tsx
import PostList from "@/app/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">المدونة</h1>
      <p className="text-slate-600 mb-8">
        مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية.
      </p>
      <PostList posts={posts} />
    </>
  );
}
