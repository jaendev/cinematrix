import 'dotenv/config'
import mysql from 'mysql2/promise'

async function resetDatabase() {
  console.log('Resetting database...')

  try {
    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in .env file')
    }

    // Extract database name from URL
    const url = new URL(DATABASE_URL)
    const dbName = url.pathname.slice(1) // Remove the leading '/'

    console.log(`Database: ${dbName}`)

    // Connect without specifying the database
    const connectionUrl = DATABASE_URL.replace(`/${dbName}`, '')
    const connection = await mysql.createConnection(connectionUrl)

    // Drop and recreate the database
    await connection.execute(`DROP DATABASE IF EXISTS \`${dbName}\``)
    console.log(`Database ${dbName} dropped`)

    await connection.execute(`CREATE DATABASE \`${dbName}\``)
    console.log(`Database ${dbName} created`)

    await connection.end()

    console.log('\nExecuting npm run db:push to apply schema changes...')

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

resetDatabase()
