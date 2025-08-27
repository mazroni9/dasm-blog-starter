// app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug, type Post as SourcePost } from "@/lib/posts";

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
    <article className="prose max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      {dateStr && <p className="text-sm text-slate-500 mt-1">{dateStr}</p>}
      {meta.excerpt && <p className="text-slate-700 mt-4">{meta.excerpt}</p>}

      {/* ✍️ إذا عندك Markdown/MDX renderer استبدل التالية بالمكوّن المناسب */}
      <div className="mt-8">
        <pre className="whitespace-pre-wrap break-words">{content}</pre>
      </div>
    </article>
  );
}
