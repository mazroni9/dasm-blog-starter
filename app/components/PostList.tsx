// app/components/PostList.tsx
import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts?.length) return <p>لا توجد مقالات بعد.</p>;

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="rounded-2xl border p-5 hover:shadow transition-shadow"
        >
          <h2 className="text-xl font-semibold">
            <Link className="hover:text-brand-600" href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          {post.date && (
            <p className="text-xs text-slate-500 mt-1">{post.date}</p>
          )}
          {post.excerpt && (
            <p className="text-slate-700 mt-3">{post.excerpt}</p>
          )}
          <div className="mt-4">
            <Link
              className="inline-flex items-center gap-2 text-brand-600 hover:underline"
              href={`/posts/${post.slug}`}
            >
              اقرأ المزيد →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
