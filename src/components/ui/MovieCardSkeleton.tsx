export function MovieCardSkeleton() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      {/* Image Section Skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-80 bg-gray-800 animate-pulse" />

        {/* Rating Badge Skeleton */}
        <div className="absolute top-4 right-4">
          <div className="bg-gray-700 px-2 py-1 rounded-md h-6 w-10 animate-pulse"></div>
        </div>

        {/* Coming Soon Badge Skeleton (sometimes visible) */}
        <div className="absolute top-4 left-4">
          <div className="bg-gray-700 px-2 py-1 rounded-md h-6 w-20 animate-pulse"></div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-700 rounded mb-2 w-3/4 animate-pulse"></div>

        {/* Description Skeleton (2 lines) */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
        </div>

        {/* Date and Duration Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Genre and Rating Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-700 px-3 py-1 rounded-full h-6 w-16 animate-pulse"></div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 w-8 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full mt-4 bg-gray-700 py-3 rounded-lg h-12 animate-pulse"></div>
      </div>
    </div>
  );
}