// app/about/page.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عن المنصة | DASM-e",
  description: "تعرف على منصة DASM-e الرائدة في المزادات الرقمية",
};

export default function AboutPage() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          عن منصة DASM-e
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          منصة رائدة في مجال المزادات الرقمية، مصممة لتوفير تجربة فريدة ومتطورة
          للمستخدمين والتجار في المملكة العربية السعودية
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="blog-card text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            مزادات حية تفاعلية
          </h3>
          <p className="text-gray-600">
            تجربة مزادات حقيقية مع تحديثات فورية وتفاعل مباشر
          </p>
        </div>

        <div className="blog-card text-center">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            محفظة رقمية متكاملة
          </h3>
          <p className="text-gray-600">
            نظام دفع آمن ومتطور مع إدارة شاملة للأموال
          </p>
        </div>

        <div className="blog-card text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            أمان وحماية عالية
          </h3>
          <p className="text-gray-600">
            أحدث تقنيات التشفير وحماية البيانات
          </p>
        </div>

        <div className="blog-card text-center">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            تصميم متجاوب
          </h3>
          <p className="text-gray-600">
            يعمل على جميع الأجهزة والأنظمة
          </p>
        </div>

        <div className="blog-card text-center">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            تغطية شاملة
          </h3>
          <p className="text-gray-600">
            خدمة في جميع أنحاء المملكة العربية السعودية
          </p>
        </div>

        <div className="blog-card text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            دعم فني متميز
          </h3>
          <p className="text-gray-600">
            فريق دعم متخصص على مدار الساعة
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="glass rounded-3xl p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            مهمتنا ورؤيتنا
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نسعى لتقديم منصة مزادات رقمية متطورة ومتاحة للجميع، مع التركيز على 
            سهولة الاستخدام والأمان والموثوقية. نهدف إلى أن نصبح الخيار الأول 
            للمزادات الرقمية في المنطقة.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            انضم إلى منصة DASM-e اليوم
          </h3>
          <p className="text-lg opacity-90 mb-6">
            اكتشف عالم المزادات الرقمية المتطور
          </p>
          <Link href="/" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            ابدأ الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
