// app/page.tsx
import PostList from "@/app/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">المدونة</h1>
      <PostList posts={posts} />
    </main>
  );
}
