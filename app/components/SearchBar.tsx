'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "ابحث في المقالات...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    router.push('/');
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`
              w-full px-6 py-4 pl-14 pr-16
              text-lg text-gray-800 placeholder-gray-500
              bg-white border-2 border-gray-200
              rounded-2xl shadow-lg
              transition-all duration-300
              focus:border-blue-500 focus:ring-4 focus:ring-blue-100
              hover:border-gray-300
              ${isFocused ? 'transform scale-105' : ''}
            `}
          />
          
          {/* Search Icon */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className={`
              absolute right-2 top-1/2 transform -translate-y-1/2
              px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold rounded-xl
              transition-all duration-300
              hover:from-blue-600 hover:to-purple-700
              hover:shadow-lg hover:scale-105
              active:scale-95
            `}
          >
            بحث
          </button>
        </div>
      </form>

      {/* Clear Button */}
      {query && (
                  <button
            onClick={handleClear}
            className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            title="مسح البحث"
            aria-label="مسح البحث"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
      )}

      {/* Search Suggestions */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-2">اقتراحات البحث:</div>
            <div className="space-y-2">
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium">"{query}"</span> في العناوين
              </div>
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="font-medium">"{query}"</span> في المحتوى
              </div>
              <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                مقالات تحتوي على <span className="font-medium">"{query}"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
