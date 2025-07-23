import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/index'
import { moviesTable } from '@/db/schema/02-content/movies'
import { directorsTable, genresTable, movieDirectorsTable, movieGenresTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const moviesWithGenres = await db
      .selectDistinct({
        id: moviesTable.id,
        title: moviesTable.title,
        synopsis: moviesTable.synopsis,
        poster: moviesTable.posterUrl,
        rating: moviesTable.rating,
        releaseDate: moviesTable.releaseDate,
        duration: moviesTable.duration,
        genreId: genresTable.id,
        genreName: genresTable.name,
        genreDescription: genresTable.description,
        directorId: directorsTable.id,
        directorsFirstName: directorsTable.firstName,
        directorLastName: directorsTable.lastName,
      })
      .from(moviesTable)
      .innerJoin(movieGenresTable, eq(moviesTable.id, movieGenresTable.movieId))
      .innerJoin(genresTable, eq(movieGenresTable.genreId, genresTable.id))
      .innerJoin(movieDirectorsTable, eq(moviesTable.id, movieDirectorsTable.movieId))
      .innerJoin(directorsTable, eq(movieDirectorsTable.directorId, directorsTable.id))


    const moviesMap = new Map()

    moviesWithGenres.forEach(row => {
      if (!moviesMap.has(row.id)) {
        moviesMap.set(row.id, {
          id: row.id,
          title: row.title,
          synopsis: row.synopsis,
          poster: row.poster,
          rating: row.rating,
          releaseDate: row.releaseDate,
          duration: row.duration,
          genres: [],
          director: {
            id: row.directorId,
            firstName: row.directorsFirstName,
            lastName: row.directorLastName
          }
        })
      }

      moviesMap.get(row.id).genres.push({
        id: row.genreId,
        name: row.genreName,
        description: row.genreDescription
      })
    })

    const movies = Array.from(moviesMap.values())

    if (!movies || movies.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No movies found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: movies,
      count: movies.length
    })

  } catch (error) {
    console.error('Error in GET /api/movies:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

  } catch (error) {
    console.error('Error in POST /api/movies:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}