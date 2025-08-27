// app/components/PostList.tsx
import Link from "next/link";

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
};

export default function PostList({ posts, activeSlug }: {
  posts: PostListItem[];
  activeSlug?: string;
}) {
  return (
    <aside className="space-y-3">
      <h2 className="font-semibold text-lg">المقالات</h2>
      <ul className="space-y-2">
        {posts.map((p) => {
          const isActive = p.slug === activeSlug;
          return (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}`}
                className={`block rounded px-3 py-2 transition
                ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "hover:bg-gray-50"}`}
              >
                <div className="text-sm">{p.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {new Date(p.date).toLocaleDateString("ar-SA")}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
