// app/components/PostList.tsx
import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts?.length) {
    return <p>لا توجد مقالات بعد.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.slug} className="border rounded-xl p-4 hover:shadow">
          <h2 className="text-xl font-semibold">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          {post.date && (
            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
          )}
          {post.excerpt && (
            <p className="text-gray-700 mt-2">{post.excerpt}</p>
          )}
          <div className="mt-3">
            <Link className="underline" href={`/posts/${post.slug}`}>
              اقرأ المزيد
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
