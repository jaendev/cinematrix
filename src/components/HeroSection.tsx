import React from 'react';
import { Play, Calendar, Clock, Star } from 'lucide-react';


export default function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Now Playing
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {movie.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-400" />
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span>8.{Math.floor(Math.random() * 9) + 1}/10</span>
            </div>
            <span className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              {movie.genre}
            </span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {movie.rating}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center space-x-3 bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
              <Play className="h-6 w-6 fill-current" />
              <span>Watch Trailer</span>
            </button>
            <button className="flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}