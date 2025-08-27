// app/posts/[slug]/page.tsx
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
    return <h1 className="text-xl font-bold">لم يتم العثور على المقال</h1>;
  }

  return (
    <article>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.date && <p className="text-sm text-slate-500 mt-1">{post.date}</p>}
      {post.excerpt && <p className="text-slate-700 mt-4">{post.excerpt}</p>}

      <div
        className="prose prose-slate mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </article>
  );
}
