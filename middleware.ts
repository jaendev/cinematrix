import { auth } from "@/auth-edge"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  console.log(`🔒 Middleware Debug:`)
  console.log(`   Path: ${pathname}`)
  console.log(`   req.auth:`, req.auth)
  console.log(`   isAuthenticated: ${isAuthenticated}`)
  console.log(`   ---`)

  // Helper function to check if path matches pattern
  const matchesPattern = (path: string, patterns: string[]): boolean => {
    return patterns.some(pattern => {
      if (pattern.includes('*')) {
        // Escapar caracteres especiales y reemplazar * por .*
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*')
        const regex = new RegExp('^' + escapedPattern + '$')
        const matches = regex.test(path)
        console.log(`🔍 Pattern "${pattern}" vs "${path}": ${matches}`) // Debug
        return matches
      }
      const exactMatch = path === pattern
      console.log(`🔍 Exact "${pattern}" vs "${path}": ${exactMatch}`) // Debug
      return exactMatch
    })
  }

  // Routes accessible without authentication
  const publicRoutes = [
    '/login',
    '/register',
    '/',
    '/api/movies',
    '/about',
    '/contact',
    '/movies/*/preview',  // Movie previews
    '/api/public/*',      // Public API routes
  ]

  // Routes that require authentication (more specific control)
  const protectedRoutes = [
    '/dashboard',
    '/dashboard/*',
    '/profile',
    '/profile/*',
    '/orders',
    '/orders/*',
    '/movies/*/book',
    '/admin',
    '/admin/*',
  ]

  // Auth routes that authenticated users should not access
  const authRoutes = ['/login', '/register']

  // If user is NOT authenticated
  if (!isAuthenticated) {
    // Check if trying to access protected route
    if (matchesPattern(pathname, protectedRoutes)) {
      const loginUrl = new URL('/login', req.nextUrl.origin)
      return Response.redirect(loginUrl)
    }

    // Check if trying to access non-public route
    if (!matchesPattern(pathname, publicRoutes)) {
      const loginUrl = new URL('/login', req.nextUrl.origin)
      return Response.redirect(loginUrl)
    }

    return // Allow access to public routes
  }

  // If user IS authenticated
  if (isAuthenticated) {
    // Redirect away from auth pages
    if (matchesPattern(pathname, authRoutes)) {
      const homeUrl = new URL('/', req.nextUrl.origin)
      return Response.redirect(homeUrl)
    }
    return // Allow access to all other routes
  }
})

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}