import { Suspense } from 'react';
import SearchBar from './SearchBar';

interface SearchBarWrapperProps {
  className?: string;
}

export default function SearchBarWrapper({ className }: SearchBarWrapperProps) {
  return (
    <Suspense fallback={
      <div className={`${className} animate-pulse`}>
        <div className="w-full h-16 bg-gray-200 rounded-2xl"></div>
      </div>
    }>
      <SearchBar className={className} />
    </Suspense>
  );
}
