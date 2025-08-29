'use client';

import { useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export default function NewsletterSender() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تحميل المشتركين
    const loadSubscribers = () => {
      try {
        const stored = localStorage.getItem('newsletter-subscribers');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSubscribers(parsed);
        }
      } catch (error) {
        console.error('خطأ في تحميل المشتركين:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  const handleSelectAll = () => {
    if (selectedSubscribers.length === subscribers.filter(s => s.isActive).length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(subscribers.filter(s => s.isActive).map(s => s.id));
    }
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('يرجى إدخال العنوان والرسالة');
      return;
    }

    if (selectedSubscribers.length === 0) {
      alert('يرجى اختيار مشتركين على الأقل');
      return;
    }

    setIsSending(true);

    try {
      // محاكاة إرسال البريد الإلكتروني
      const selectedEmails = subscribers
        .filter(s => selectedSubscribers.includes(s.id))
        .map(s => s.email);

      console.log('إرسال النشرة الإخبارية إلى:', selectedEmails);
      console.log('العنوان:', subject);
      console.log('الرسالة:', message);

      // في التطبيق الحقيقي، هنا يتم إرسال البريد الإلكتروني
      // يمكن استخدام خدمات مثل SendGrid, Mailgun, أو AWS SES

      // حفظ سجل الإرسال
      const newsletterLog = {
        id: Date.now().toString(),
        subject,
        message,
        sentTo: selectedEmails,
        sentAt: new Date().toISOString(),
        recipientCount: selectedEmails.length
      };

      const existingLogs = JSON.parse(localStorage.getItem('newsletter-logs') || '[]');
      const updatedLogs = [newsletterLog, ...existingLogs];
      localStorage.setItem('newsletter-logs', JSON.stringify(updatedLogs));

      alert(`تم إرسال النشرة الإخبارية بنجاح إلى ${selectedEmails.length} مشترك!`);
      
      // إعادة تعيين النموذج
      setSubject('');
      setMessage('');
      setSelectedSubscribers([]);

    } catch (error) {
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  const activeSubscribers = subscribers.filter(s => s.isActive);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          إرسال النشرة الإخبارية
        </h2>
        <p className="text-gray-600">
          أرسل آخر التحديثات والأخبار إلى المشتركين
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* نموذج النشرة الإخبارية */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان النشرة الإخبارية
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="مثال: تحديثات جديدة في منصة DASM"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              محتوى الرسالة
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب محتوى النشرة الإخبارية هنا..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSendNewsletter}
            disabled={isSending || selectedSubscribers.length === 0}
            className={`
              w-full read-more text-lg py-3 px-6
              ${isSending || selectedSubscribers.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              transition-all duration-300
            `}
          >
            {isSending ? 'جاري الإرسال...' : `إرسال إلى ${selectedSubscribers.length} مشترك`}
          </button>
        </div>

        {/* قائمة المشتركين */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              المشتركين النشطين ({activeSubscribers.length})
            </h3>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedSubscribers.length === activeSubscribers.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
            {activeSubscribers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                لا يوجد مشتركين نشطين
              </div>
            ) : (
              <div className="space-y-2">
                {activeSubscribers.map((subscriber) => (
                  <label
                    key={subscriber.id}
                    className="flex items-center space-x-3 space-x-reverse p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.includes(subscriber.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSubscribers([...selectedSubscribers, subscriber.id]);
                        } else {
                          setSelectedSubscribers(selectedSubscribers.filter(id => id !== subscriber.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{subscriber.name}</div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {selectedSubscribers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-sm text-blue-800">
                <strong>محدد:</strong> {selectedSubscribers.length} مشترك
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
