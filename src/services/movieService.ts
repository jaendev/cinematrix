import { apiClient } from "@/api/apiClient";
import { DataMovie } from "@/types/movie";

export const getMovies = () => apiClient.get<DataMovie>("/movies");