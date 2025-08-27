// app/page.tsx
import { getAllPosts } from "@/lib/posts";
import PostList from "./components/PostList";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latest = posts[0]; // أحدث مقال
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* العمود الجانبي (يمين في RTL) */}
      <div className="lg:col-span-4">
        <PostList posts={posts} />
      </div>

      {/* مساحة المحتوى الأوسع */}
      <div className="lg:col-span-8">
        {latest ? (
          <article className="prose prose-slate max-w-none prose-headings:font-bold">
            <h2 className="!mt-0">{latest.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(latest.date).toLocaleDateString("ar-SA")}
            </p>
            <p className="mt-4">
              هذا أحدث مقال لدينا. لقراءة التفاصيل اضغط:
              {" "}
              <Link className="text-indigo-600 underline" href={`/posts/${latest.slug}`}>
                قراءة المقال
              </Link>
            </p>
          </article>
        ) : (
          <p className="text-gray-600">لا توجد مقالات بعد.</p>
        )}
      </div>
    </div>
  );
}
