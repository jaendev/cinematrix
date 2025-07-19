'use client'

import { useSession, signOut } from 'next-auth/react'

export default function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span>Loading...</span>
    </div>
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Sign In
        </a>
        <a
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm">
        <p className="font-medium text-gray-900">
          Welcome, {session.user.firstName}!
        </p>
        <p className="text-gray-600">{session.user.email}</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200 text-sm"
      >
        Sign Out
      </button>
    </div>
  )
}