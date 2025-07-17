import { execSync } from 'child_process'

async function setupDatabase() {
  console.log('Starting complete database setup...')

  try {
    console.log('\nStep 1: Fixing data types...')
    execSync('npm run db:fix-types', { stdio: 'inherit' })

    console.log('\nStep 2: Resetting database...')
    execSync('npm run db:reset', { stdio: 'inherit' })

    console.log('\nStep 3: Pushing schema to database...')
    execSync('npm run db:push', { stdio: 'inherit' })

    console.log('\nStep 4: Seeding with sample data...')
    execSync('npm run db:seed', { stdio: 'inherit' })

    console.log('\nStep 5: Verifying schema...')
    execSync('npm run schema:verify', { stdio: 'inherit' })

    console.log('\nDatabase setup completed successfully!')
    console.log('\nYou can now:')
    console.log('1. Run "npm run db:studio" to open Drizzle Studio')
    console.log('2. Start your Next.js app with "npm run dev"')

  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()
