// app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug, type Post as SourcePost } from "@/lib/posts";
import Link from "next/link";
import Comments from "@/app/components/Comments";

// نفس دالة تطبيع التاريخ المستخدمة في الصفحة الرئيسية
function toDateString(value: SourcePost["date"]): string | undefined {
  if (!value) return undefined;
  try {
    if (typeof value === "string") return value;
    if (typeof value === "number") return new Date(value).toISOString().slice(0, 10);
    if (value instanceof Date) return value.toISOString().slice(0, 10);
  } catch {}
  return undefined;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ✅ لاحظ: params صار Promise — نفكّه بـ await
export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const { meta, content } = await getPostBySlug(slug);
  const dateStr = toDateString(meta.date);

  return (
    <article className="max-w-4xl mx-auto fade-in">
      {/* Article Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          {meta.title}
        </h1>
        {dateStr && (
          <div className="text-gray-500 text-lg mb-6">
            {new Date(dateStr).toLocaleDateString("ar-SA", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>
        )}
        {meta.excerpt && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {meta.excerpt}
          </p>
        )}
      </div>

      {/* Article Content */}
      <div className="blog-card">
        <div className="prose prose-lg max-w-none">
          {/* ✍️ إذا عندك Markdown/MDX renderer استبدل التالية بالمكوّن المناسب */}
          <div className="whitespace-pre-wrap break-words text-gray-700 leading-relaxed">
            {content}
          </div>
        </div>
      </div>

      {/* Back to Blog */}
      <div className="text-center mt-12">
        <Link href="/" className="read-more">
          ← العودة إلى المدونة
        </Link>
      </div>

      {/* Related Posts Suggestion */}
      <div className="mt-16 p-8 bg-gray-50 rounded-3xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          مقالات ذات صلة
        </h3>
        <div className="text-center text-gray-600">
          <p>اكتشف المزيد من المقالات المثيرة في مدونتنا</p>
          <Link href="/" className="read-more mt-4 inline-block">
            تصفح جميع المقالات
          </Link>
        </div>
      </div>

      {/* Comments Section */}
      <Comments postSlug={slug} />
    </article>
  );
}
