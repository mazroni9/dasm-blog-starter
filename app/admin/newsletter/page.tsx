import NewsletterSender from '@/app/components/NewsletterSender';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "إرسال النشرة الإخبارية | DASM",
  description: "إرسال رسائل إخبارية للمشتركين",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/admin" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← العودة إلى لوحة التحكم
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            إرسال النشرة الإخبارية
          </h1>
          <p className="text-xl text-gray-600">
            أرسل آخر التحديثات والأخبار إلى المشتركين
          </p>
        </div>

        {/* Newsletter Sender Component */}
        <NewsletterSender />
      </div>
    </div>
  );
}
