import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return (
    <article>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-xs text-gray-500 mb-6">{new Date(post.date).toLocaleDateString("ar-SA")}</div>
      <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
