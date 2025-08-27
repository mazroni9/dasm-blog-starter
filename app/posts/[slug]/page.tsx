// app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

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
