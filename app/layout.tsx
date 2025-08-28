// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "مدونة DASM-e",
  description: "أخبار المنصة، التعريفات، المقالات التقنية"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {/* Navigation */}
        <nav className="nav-container sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                DASM Blog
              </Link>
              <div className="flex gap-8 text-gray-600">
                <Link href="/" className="nav-link hover:text-gray-900">
                  الرئيسية
                </Link>
                <Link href="/about" className="nav-link hover:text-gray-900">
                  عن المنصة
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-bg">
          <div className="hero-section">
            <h1 className="hero-title">مدونة DASM</h1>
            <p className="hero-subtitle">
              مقالات تقنية وتشغيلية حول DASM-e ومنتجاتنا الفرعية
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <h3 className="text-2xl font-bold mb-4">DASM</h3>
            <p className="text-lg opacity-90">
              منصة المزادات الرقمية الرائدة في المملكة العربية السعودية
            </p>
            <div className="mt-6 text-sm opacity-75">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
