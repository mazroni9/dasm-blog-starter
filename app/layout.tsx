export const metadata = {
  title: "DASM Blog",
  description: "Simple blog for DASM-e",
};

import "./../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="mx-auto max-w-3xl px-4 py-8 text-gray-900">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">مدونة داسم - DASM Blog</h1>
          <p className="text-sm text-gray-600">أخبار المنصة، التحديثات، المقالات التقنية</p>
          <hr className="mt-4" />
        </header>
        {children}
        <footer className="mt-12 text-xs text-gray-500">
          © {new Date().getFullYear()} DASM-e
        </footer>
      </body>
    </html>
  );
}
