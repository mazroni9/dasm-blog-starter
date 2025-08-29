'use client';

import { useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تحميل المشتركين من localStorage
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

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشترك؟')) {
      const updated = subscribers.filter(sub => sub.id !== id);
      setSubscribers(updated);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(updated));
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = subscribers.map(sub => 
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    );
    setSubscribers(updated);
    localStorage.setItem('newsletter-subscribers', JSON.stringify(updated));
  };

  const exportSubscribers = () => {
    const csvContent = [
      'الاسم,البريد الإلكتروني,تاريخ الاشتراك,الحالة',
      ...subscribers.map(sub => 
        `${sub.name},${sub.email},${new Date(sub.subscribedAt).toLocaleDateString('ar-SA')},${sub.isActive ? 'نشط' : 'غير نشط'}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dasm-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            إدارة المشتركين في النشرة الإخبارية
          </h1>
          <p className="text-xl text-gray-600">
            إدارة قائمة المشتركين وإرسال التحديثات
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {subscribers.length}
            </div>
            <div className="text-gray-600">إجمالي المشتركين</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {subscribers.filter(s => s.isActive).length}
            </div>
            <div className="text-gray-600">المشتركين النشطين</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {subscribers.filter(s => !s.isActive).length}
            </div>
            <div className="text-gray-600">المشتركين غير النشطين</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {subscribers.length > 0 ? 
                Math.round((subscribers.filter(s => s.isActive).length / subscribers.length) * 100) : 0
              }%
            </div>
            <div className="text-gray-600">نسبة النشاط</div>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={exportSubscribers}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            📊 تصدير القائمة (CSV)
          </button>
        </div>

        {/* قائمة المشتركين */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    الاسم
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    تاريخ الاشتراك
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      لا يوجد مشتركين حتى الآن
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subscriber.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(subscriber.subscribedAt).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          inline-flex px-3 py-1 text-xs font-semibold rounded-full
                          ${subscriber.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                          }
                        `}>
                          {subscriber.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleToggleStatus(subscriber.id)}
                          className={`
                            px-3 py-1 rounded-lg text-xs font-medium transition-colors
                            ${subscriber.isActive
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }
                          `}
                        >
                          {subscriber.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
