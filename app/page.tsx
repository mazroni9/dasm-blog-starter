import { getAllPosts } from "../lib/posts";
export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <main>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-4">
            <a className="text-xl font-semibold hover:underline" href={`/posts/${p.slug}`}>{p.title}</a>
            <div className="text-xs text-gray-500 mt-1">{new Date(p.date).toLocaleDateString("ar-SA")}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
