// app/page.tsx
import { Metadata } from "next";
import PostList, { type Post as PostListPost } from "@/app/components/PostList";
import { getAllPosts, type Post as SourcePost } from "@/lib/posts";
import Link from "next/link";
import Categories from "@/app/components/Categories";
import SearchBarWrapper from "@/app/components/SearchBarWrapper";
import NewsletterSignup from "@/app/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "المدونة | DASM",
  description: "مقالات تقنية وتشغيلية حول DASM ومنتجاتنا الفرعية.",
};

// توحيد التاريخ إلى نص YYYY-MM-DD (أو undefined)
function toDateString(value: SourcePost["date"]): string | undefined {
  if (!value) return undefined;
  try {
    if (typeof value === "string") return value;
    if (typeof value === "number") return new Date(value).toISOString().slice(0, 10);
    if (value instanceof Date) return value.toISOString().slice(0, 10);
  } catch {}
  return undefined;
}

export default async function Page() {
  const posts = await getAllPosts();

  // نطابق نوع PostList: نجعل date من نوع string | undefined
  const normalized: PostListPost[] = posts.map((p) => ({
    ...p,
    date: toDateString(p.date),
  })) as PostListPost[];

  return (
    <div className="fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          مرحباً بكم في مدونة DASM
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          اكتشف أحدث المقالات والتحديثات حول منصتنا الرائدة في المزادات الرقمية
        </p>
      </div>

      {/* Categories */}
      <Categories />

      {/* Search Bar */}
      <div className="mb-12">
        <SearchBarWrapper className="max-w-2xl mx-auto" />
      </div>

      {/* Posts Grid */}
      {normalized.length ? (
        <div className="posts-grid">
          {normalized.map((post, index) => (
            <article key={post.slug} className="post-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="post-image">
                {post.title.charAt(0)}
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                {post.excerpt && (
                  <p className="post-excerpt">{post.excerpt}</p>
                )}
                <div className="post-meta">
                  {post.date && (
                    <span className="post-date">
                      {new Date(post.date).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  )}
                  <Link href={`/posts/${post.slug}`} className="read-more">
                    اقرأ المزيد
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl">
          لا توجد مقالات حتى الآن.
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
