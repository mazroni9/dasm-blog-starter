// app/page.tsx
import { getAllPosts } from "./lib/posts";
import BlogShell from "../components/BlogShell";

export default async function HomePage() {
  const posts = await getAllPosts();

  const first = posts[0]; // أول مقالة كافتراضي
  return (
    <BlogShell
      posts={posts.map(p => ({ slug: p.slug, title: p.title, date: p.date }))}
      activeSlug={first?.slug}
      sidebarOn="right" // أو "left"
      title="مدونة داسم"
      subtitle="أخبار المنصة، التحديثات، المقالات التقنية"
    >
      {first ? (
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-8">
          <h2 className="text-2xl font-bold mb-2">{first.title}</h2>
          <div className="text-xs text-gray-500 mb-4">
            {new Date(first.date).toLocaleDateString("ar-SA")}
          </div>
          <div dangerouslySetInnerHTML={{ __html: first.html }} />
        </article>
      ) : (
        <p>لا توجد مقالات حتى الآن.</p>
      )}
    </BlogShell>
  );
}
