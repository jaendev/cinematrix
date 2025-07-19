/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { getMovies } from "@/services/movieService";
import { DataMovie, Movie } from "@/types/movie";

export function useMovies() {
  const [dataMovie, setDataMovie] = useState<DataMovie>()
  const [movies, setMovies] = useState<Movie[]>()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getMovies()
        setDataMovie(data)
        if (dataMovie) {
          setMovies(data.data as Movie[])
        }
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchAlert()
  }, [dataMovie])

  return { movies, error, loading }
}