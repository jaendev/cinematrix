'use client'

import { useState } from 'react';
import { Search, User, Menu, Film } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { HeaderSkeleton } from './ui/HeaderSkeleton';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession()
  const router = useRouter();

  if (status === 'loading') {
    return <HeaderSkeleton />
  }

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <Film className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">CineMatrix</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors duration-300 w-64"
              />
            </div>
            {session ? (
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 font-medium cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 font-medium cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none w-full"
                />
              </div>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 font-medium"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}