import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/index'
import { eq } from 'drizzle-orm'
import { moviesTable } from '@/db/schema/02-content/movies'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Movie ID is required'
        },
        { status: 400 }
      )
    }

    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid movie ID format'
        },
        { status: 400 }
      )
    }

    console.log(`Querying movie with ID ${movieId} from the database...`)

    const movies = await db.select()
      .from(moviesTable)
      .where(eq(moviesTable.id, movieId))
      .limit(1)

    if (!movies || movies.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Movie with ID ${movieId} not found`
        },
        { status: 404 }
      )
    }

    console.log(`Found movie with ID ${movieId}:`, movies[0])

    return NextResponse.json({
      success: true,
      data: movies[0] // Return the first movie found (and unique)
    })

  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}