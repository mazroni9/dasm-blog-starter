'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      content: 'مقال رائع جداً! شكراً لكم على هذه المعلومات القيمة.',
      date: '2025-01-27',
      replies: [
        {
          id: '1-1',
          name: 'فريق DASM',
          email: 'team@dasm.com',
          content: 'شكراً لك أحمد! نحن سعداء أن المقال أعجبك.',
          date: '2025-01-27'
        }
      ]
    },
    {
      id: '2',
      name: 'سارة أحمد',
      email: 'sara@example.com',
      content: 'أفكار ممتازة! متى ستكون المقالة القادمة؟',
      date: '2025-01-27'
    }
  ]);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.content) return;

    const comment: Comment = {
      id: Date.now().toString(),
      name: newComment.name,
      email: newComment.email,
      content: newComment.content,
      date: new Date().toISOString().split('T')[0]
    };

    setComments([comment, ...comments]);
    setNewComment({ name: '', email: '', content: '' });
    setShowForm(false);
  };

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        التعليقات ({comments.length})
      </h3>

      {/* Add Comment Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="read-more"
        >
          {showForm ? 'إلغاء التعليق' : 'أضف تعليقاً'}
        </button>
      </div>

      {/* Comment Form */}
      {showForm && (
        <div className="blog-card mb-8">
          <h4 className="text-xl font-semibold mb-4">أضف تعليقك</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="اسمك"
                value={newComment.name}
                onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={newComment.email}
                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="تعليقك..."
              value={newComment.content}
              onChange={(e) => setNewComment({...newComment, content: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="read-more"
            >
              إرسال التعليق
            </button>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="blog-card">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {comment.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4 mr-8">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <h5 className="font-medium text-gray-800">{reply.name}</h5>
                          <span className="text-sm text-gray-500">{reply.date}</span>
                        </div>
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
