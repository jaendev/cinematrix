import React from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter()
  console.log(movie.poster);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
      <div className="relative overflow-hidden">
        <Image
          src={movie.poster || '/poster.png'}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110 text-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-sm font-semibold">
            {movie.rating}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {movie.synopsis || 'No description available.'}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
            {movie.genres.map(genre => genre.name).join(', ')}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">8.{Math.floor(Math.random() * 9) + 1}</span>
          </div>
        </div>
        <button onClick={() => router.push(`/movies/${movie.id}`)} className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:translate-y-[-2px] cursor-pointer">
          Show all info
        </button>
      </div>
    </div>
  );
}