export function HeaderSkeleton() {
  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Desktop Search & Auth Skeleton */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar Skeleton */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-gray-600 rounded animate-pulse"></div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg h-10 w-64 animate-pulse"></div>
            </div>

            {/* Auth Button Skeleton */}
            <div className="flex items-center space-x-2 bg-yellow-400/30 px-4 py-2 rounded-lg h-10 w-24 animate-pulse">
              <div className="h-4 w-4 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="md:hidden h-6 w-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}