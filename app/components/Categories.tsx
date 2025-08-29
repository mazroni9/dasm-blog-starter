'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  color: string;
  icon: string;
}

interface CategoriesProps {
  activeCategory?: string;
}

const categories: Category[] = [
  {
    id: 'all',
    name: 'جميع المقالات',
    nameEn: 'All Posts',
    count: 13,
    color: 'from-blue-500 to-purple-600',
    icon: '📚'
  },
  {
    id: 'news',
    name: 'أخبار وتحديثات',
    nameEn: 'News & Updates',
    count: 2,
    color: 'from-green-500 to-blue-600',
    icon: '📰'
  },
  {
    id: 'tech',
    name: 'تقنية وتطوير',
    nameEn: 'Tech & Development',
    count: 3,
    color: 'from-purple-500 to-pink-600',
    icon: '💻'
  },
  {
    id: 'guides',
    name: 'أدلة ونصائح',
    nameEn: 'Guides & Tips',
    count: 4,
    color: 'from-orange-500 to-red-600',
    icon: '📖'
  }
];

export default function Categories({ activeCategory = 'all' }: CategoriesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        تصفح حسب الفئة
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.id === 'all' ? '/' : `/?category=${category.id}`}
            className={`relative group transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className={`
              bg-gradient-to-br ${category.color} 
              rounded-2xl p-6 text-white text-center
              shadow-lg hover:shadow-xl transition-all duration-300
              ${hoveredCategory === category.id ? 'transform -translate-y-2' : ''}
            `}>
              <div className="text-4xl mb-3">{category.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
              <p className="text-sm opacity-90 mb-3">{category.nameEn}</p>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium">
                {category.count} مقال
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
