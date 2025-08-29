import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "لوحة التحكم | DASM",
  description: "إدارة المدونة والمشتركين",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            لوحة تحكم DASM
          </h1>
          <p className="text-xl text-gray-600">
            إدارة المدونة والمشتركين والنشرة الإخبارية
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              إدارة المشتركين
            </h3>
            <p className="text-gray-600 mb-4">
              عرض وإدارة قائمة المشتركين في النشرة الإخبارية
            </p>
            <Link
              href="/admin/subscribers"
              className="read-more inline-block"
            >
              إدارة المشتركين
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              إرسال النشرة الإخبارية
            </h3>
            <p className="text-gray-600 mb-4">
              إنشاء وإرسال رسائل إخبارية للمشتركين
            </p>
            <Link
              href="/admin/newsletter"
              className="read-more inline-block"
            >
              إرسال النشرة
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              إدارة المقالات
            </h3>
            <p className="text-gray-600 mb-4">
              إضافة وتعديل المقالات في المدونة
            </p>
            <Link
              href="/"
              className="read-more inline-block"
            >
              عرض المدونة
            </Link>
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            روابط سريعة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                إدارة المحتوى
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    ← العودة إلى المدونة
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:text-blue-800">
                    صفحة "عن المنصة"
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                إدارة النظام
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin/subscribers" className="text-blue-600 hover:text-blue-800">
                    قائمة المشتركين
                  </Link>
                </li>
                <li>
                  <Link href="/admin/newsletter" className="text-blue-600 hover:text-blue-800">
                    إرسال النشرة الإخبارية
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* معلومات النظام */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>لوحة التحكم - DASM Blog v1.0</p>
          <p>تم التطوير باستخدام Next.js و TypeScript</p>
        </div>
      </div>
    </div>
  );
}
