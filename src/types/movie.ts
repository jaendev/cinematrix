export interface DataMovie {
  data: []
  success: string
  count: number
}

export interface Movie extends DataMovie {
  id: number
  title: string
  originalTitle?: string
  synopsis?: string
  duration: number
  releaseDate: string
  country?: string
  language?: string
  rating?: string
  posterUrl?: string
  trailerUrl?: string
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}