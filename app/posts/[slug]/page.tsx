// app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "../../lib/posts";
import BlogShell from "../../../components/BlogShell";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const post = await getPostBySlug(params.slug);

  return (
    <BlogShell
      posts={posts.map(p => ({ slug: p.slug, title: p.title, date: p.date }))}
      activeSlug={post.slug}
      sidebarOn="right" // أو "left"
      title="مدونة داسم"
      subtitle="أخبار المنصة، التحديثات، المقالات التقنية"
    >
      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-8">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <div className="text-xs text-gray-500 mb-4">
          {new Date(post.date).toLocaleDateString("ar-SA")}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </BlogShell>
  );
}
