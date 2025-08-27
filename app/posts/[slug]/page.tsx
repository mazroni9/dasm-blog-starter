// app/posts/[slug]/page.tsx
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/posts";
import PostList from "@/app/components/PostList";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return { title: `${post.title} | مدونة داسم` };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const [posts, post] = await Promise.all([
    getAllPosts(),
    getPostBySlug(params.slug),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* العمود الجانبي */}
      <div className="lg:col-span-4">
        <PostList posts={posts} activeSlug={params.slug} />
      </div>

      {/* المقال */}
      <div className="lg:col-span-8">
        <article className="prose prose-slate max-w-none prose-headings:font-bold">
          <h2 className="!mt-0">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("ar-SA")}
          </p>
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    </div>
  );
}
