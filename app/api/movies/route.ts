import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/index'
import { moviesTable } from '@/db/schema/02-content/movies'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = db.select().from(moviesTable)

    const movies = await query

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