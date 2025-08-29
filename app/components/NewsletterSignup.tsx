'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  className?: string;
}

export default function NewsletterSignup({ className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name.trim()) {
      setError('يرجى إدخال الاسم والبريد الإلكتروني');
      return;
    }

    if (!email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    setIsSubscribing(true);
    setError('');

    try {
      // حفظ المشترك في قاعدة البيانات المحلية
      const subscriber = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subscribedAt: new Date().toISOString(),
        isActive: true
      };

      // حفظ في localStorage (يمكن تغييرها لاحقاً لقاعدة بيانات حقيقية)
      const existingSubscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      const updatedSubscribers = [...existingSubscribers, subscriber];
      localStorage.setItem('newsletter-subscribers', JSON.stringify(updatedSubscribers));

      // إرسال تأكيد (يمكن ربطها لاحقاً بخدمة إرسال بريد إلكتروني)
      console.log('تم الاشتراك بنجاح:', subscriber);

      // إظهار رسالة النجاح
      setIsSubscribed(true);
      setEmail('');
      setName('');

      // إعادة تعيين الحالة بعد 5 ثوانٍ
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);

    } catch (err) {
      setError('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`${className} text-center`}>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            تم الاشتراك بنجاح!
          </h3>
          <p className="text-green-700 text-lg">
            شكراً لك! ستتلقى آخر المقالات والتحديثات مباشرة في بريدك الإلكتروني.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          انضم إلى مجتمع DASM
        </h3>
        <p className="text-gray-600 mb-6">
          احصل على آخر التحديثات والأخبار مباشرة في بريدك الإلكتروني
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubscribing}
            className={`
              w-full read-more text-lg py-3 px-6
              ${isSubscribing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              transition-all duration-300
            `}
          >
            {isSubscribing ? 'جاري الاشتراك...' : 'اشترك الآن'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث.
          </p>
        </div>
      </div>
    </div>
  );
}
