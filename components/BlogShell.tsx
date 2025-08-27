// components/BlogShell.tsx
"use client";

import Link from "next/link";

type PostLink = { slug: string; title: string; date: string };

export default function BlogShell({
  title = "مدونة داسم",
  subtitle = "أخبار المنصة، التحديثات، المقالات التقنية",
  posts,
  activeSlug,
  children,
  sidebarOn = "right", // "right" للشريط يمين، "left" للشريط يسار
}: {
  title?: string;
  subtitle?: string;
  posts: PostLink[];
  activeSlug?: string;
  children: React.ReactNode;
  sidebarOn?: "right" | "left";
}) {
  // ترتيب الأعمدة حسب المكان الذي تريده للشريط الجانبي
  const sidebarCol =
    "md:col-span-4 space-y-2";
  const mainCol =
    "md:col-span-8 bg-white rounded-lg p-5 shadow-sm";

  const grid =
    sidebarOn === "right"
      ? // الشريط يمين – نبدأ بالمحتوى ثم الشريط (في RTL سيظهر الشريط على اليمين)
        <>
          <div className={mainCol}>{children}</div>
          <aside className={sidebarCol}>
            <h3 className="text-lg font-semibold mb-2">المقالات</h3>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/posts/${p.slug}`}
                    className={`block border rounded px-3 py-2 hover:bg-gray-50 ${
                      activeSlug === p.slug ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {new Date(p.date).toLocaleDateString("ar-SA")}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </>
      : // الشريط يسار – نرسم الشريط ثم المحتوى
        <>
          <aside className={sidebarCol}>
            <h3 className="text-lg font-semibold mb-2">المقالات</h3>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/posts/${p.slug}`}
                    className={`block border rounded px-3 py-2 hover:bg-gray-50 ${
                      activeSlug === p.slug ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {new Date(p.date).toLocaleDateString("ar-SA")}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className={mainCol}>{children}</div>
        </>;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* رأس الصفحة */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
      </header>

      {/* المحتوى */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {grid}
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 py-8">
        © {new Date().getFullYear()} DASM-e
      </footer>
    </div>
  );
}
