// app/posts/[slug]/page.tsx
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const revalidate = 300;

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-bold">لم يتم العثور على المقال</h1>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500"
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      {/* زر العودة */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500"
        >
          ← العودة للرئيسية
        </Link>
      </div>

      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.date && <p className="text-sm text-slate-500 mt-1">{post.date}</p>}
      {post.excerpt && <p className="text-slate-700 mt-4">{post.excerpt}</p>}

      {post.content && (
        <div
          className="prose prose-slate mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  );
}
