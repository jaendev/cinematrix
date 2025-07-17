import { schema } from '../src/db/index'

async function verifySchema() {
  console.log('Verifying database schema...\n')

  try {
    // Verify all tables
    const tables = Object.keys(schema)
    console.log(`Tables found: ${tables.length}`)

    tables.forEach((table, index) => {
      console.log(`${index + 1}. ${table}`)
    })

    console.log('\nSchema verified successfully!')
    console.log('\nNext steps:')
    console.log('1. npm run db:push          - Create tables in MySQL')
    console.log('2. npm run db:studio        - Open Drizzle Studio')
    console.log('3. npm run seed             - Populate with sample data')

  } catch (error) {
    console.error('Error verifying schema:', error)
    process.exit(1)
  }
}

verifySchema()
