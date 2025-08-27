import { getPostBySlug, getAllSlugs } from "../../../lib/posts";

// يولّد مسارات التدوينات من ملفات content/*.md
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ Next.js 15: params قد يكون Promise
export default async function PostPage(
  props: { params: Promise<{ slug: string }> } // لاحظ Promise هنا
) {
  const { slug } = await props.params;          // نأخذ slug بعد await
  const post = await getPostBySlug(slug);

  return (
    <article>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-xs text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString("ar-SA")}
      </div>
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
