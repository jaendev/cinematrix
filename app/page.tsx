'use client'

import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import { MovieGridSkeleton } from "@/components/ui/MovieGridSkeleton";
import { useMovies } from "@/hooks/useMovies";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {

  const { movies, loading } = useMovies()
  const [searchQuery, setSearchQuery] = useState('')

  console.log(movies);


  // Filtering movies based on the search query
  const filteredMovies = useMemo(() => {
    if (!movies || !searchQuery.trim()) {
      return movies || []
    }

    const query = searchQuery.toLowerCase().trim()
    return movies.filter(movie =>
      movie.title?.toLowerCase().includes(query)
    )
  }, [movies, searchQuery])

  // Function to improvement search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="bg-black min-h-screen">
        {/* Hero Section */}
        {/* <HeroSection
          title="Welcome to MovieHub"
          subtitle="Your gateway to the latest movies"
          backgroundImage="/hero-bg.jpg"
          ctaText="Explore Now"
          ctaLink="/movies"
          ctaIcon={<Filter className="h-5 w-5" />}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        /> */}
        {/* Movies Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {searchQuery ? 'Search Results' : 'Discover Movies'}
                </h2>
                <p className="text-gray-400">
                  {searchQuery
                    ? `Showing ${filteredMovies.length} result${filteredMovies.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : 'Find your next cinematic adventure'
                  }
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <Filter className="h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>

            {/* Movies Grid */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">
                {searchQuery ? 'Results' : 'Now Showing'}
              </h3>

              {loading ? (
                <MovieGridSkeleton key={8} />
              ) : filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-xl">
                    No movies found matching &apos;{searchQuery}&apos;
                  </p>
                  <button
                    onClick={clearSearch}
                    className="mt-4 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 cursor-pointer"
                  >
                    Show all movies
                  </button>
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-xl">No movies available.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>

  );
}
