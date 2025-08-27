// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "مدونة DASM-e",
  description: "منصة مزادات رقمية تفاعلية مبتكرة"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-slate-900">
        <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-brand-600">
              DASM-e Blog
            </Link>
            <div className="text-sm text-slate-600">
              <Link href="/" className="hover:text-brand-600">الرئيسية</Link>
            </div>
          </nav>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>

        <footer className="mt-16 border-t">
          <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} DASM-e — جميع الحقوق محفوظة.
          </div>
        </footer>
      </body>
    </html>
  );
}
