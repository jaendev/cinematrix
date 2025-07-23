/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { getMovies } from "@/services/movieService";
import { Movie } from "@/types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await getMovies()

        if (data && data.data) {
          setMovies(data.data as Movie[])
        }
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        console.error('Error fetching movies:', e)
      } finally {
        setLoading(false);
      }
    }

    fetchMovies()
  }, [])

  return { movies, error, loading }
}