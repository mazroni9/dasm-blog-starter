// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدونة داسم - DASM Blog",
  description: "أخبار المنصة، التحديثات، والمقالات التقنية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              DASM Blog - مدونة داسم
            </h1>
            <p className="mt-2 text-gray-600">
              أخبار المنصة، التحديثات، المقالات التقنية
            </p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="border-t">
          <div className="container mx-auto px-4 py-6 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} DASM-e
          </div>
        </footer>
      </body>
    </html>
  );
}
