import fs from 'fs'
import path from 'path'

const SCHEMA_DIR = path.join(process.cwd(), 'src/db/schema')

async function fixTypes() {
  console.log('Fixing data types consistency...')

  try {
    // Get all TypeScript files in schema directory recursively
    const files = getAllTsFiles(SCHEMA_DIR)

    console.log(`Found ${files.length} TypeScript files`)

    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8')
      let modified = false

      // Fix primary keys: serial().primaryKey() -> int().primaryKey().autoincrement()
      if (content.includes('serial().primaryKey()')) {
        content = content.replace(/serial\(\)\.primaryKey\(\)/g, 'int().primaryKey().autoincrement()')
        modified = true
        console.log(`Fixed primary key in: ${path.relative(SCHEMA_DIR, file)}`)
      }

      // Ensure int is imported if we're using it
      if (content.includes('int()') && !content.includes('int,') && !content.includes('int ')) {
        // Add int to existing import if mysql-core is already imported
        if (content.includes("from 'drizzle-orm/mysql-core'")) {
          content = content.replace(
            /(import\s*{[^}]*)(}\s*from\s*['"]drizzle-orm\/mysql-core['"])/,
            (match, p1, p2) => {
              if (!p1.includes('int')) {
                return p1 + ', int' + p2
              }
              return match
            }
          )
          modified = true
        }
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf8')
        console.log(`Updated: ${path.relative(SCHEMA_DIR, file)}`)
      }
    }

    console.log('Type fixing completed successfully!')
    console.log('\nNext steps:')
    console.log('1. npm run db:reset')
    console.log('2. npm run db:push')

  } catch (error) {
    console.error('Error fixing types:', error)
    process.exit(1)
  }
}

function getAllTsFiles(dir: string): string[] {
  const files: string[] = []

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllTsFiles(fullPath))
    } else if (item.endsWith('.ts')) {
      files.push(fullPath)
    }
  }

  return files
}

fixTypes()
