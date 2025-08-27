// app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// Next.js 15: params هو Promise ويحتاج await
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// (اختياري) لو تبغى SSG مع إعادة توليد
export const revalidate = 60; // ثواني

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params; // ✅ نفك الـ Promise
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-bold">لم يتم العثور على المقال</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {post.date && <p className="text-sm text-gray-500 mt-1">{post.date}</p>}
      {post.excerpt && <p className="text-gray-700 mt-4">{post.excerpt}</p>}
      {post.content && (
        <div
          className="prose prose-neutral mt-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </main>
  );
}
