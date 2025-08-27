// app/about/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

export const revalidate = 300;

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about-dasm.md");
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500"
        >
          ← العودة للرئيسية
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        {data.title ?? "عن منصة DASM-e"}
      </h1>

      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
