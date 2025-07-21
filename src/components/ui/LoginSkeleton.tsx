export function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button Skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-600 rounded animate-pulse"></div>
        </div>

        {/* Login Card Skeleton */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Header Skeleton */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/20 p-3 rounded-full">
                <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-7 w-40 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-48 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Form Skeleton */}
          <div className="p-8 space-y-6">
            {/* Email Field Skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-full h-12 bg-gray-800 rounded-lg border border-gray-700 pl-12 pr-4 animate-pulse"></div>
              </div>
            </div>

            {/* Password Field Skeleton */}
            <div>
              <div className="h-4 w-16 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-full h-12 bg-gray-800 rounded-lg border border-gray-700 pl-12 pr-12 animate-pulse"></div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Remember Me & Forgot Password Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="w-full h-12 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-lg animate-pulse"></div>

            {/* Register Link Skeleton */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-1">
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-yellow-600/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}