# Database Scripts Documentation

This directory contains scripts to manage the Cinema database.

## Available Scripts

### Core Database Operations

- **`npm run db:setup`** - Complete database setup (recommended for first time)
  - Runs all necessary steps in order: fix types, reset, push schema, seed data, verify

- **`npm run db:reset`** - Drop and recreate the database
  - Completely removes all data and tables
  - Creates a fresh empty database

- **`npm run db:push`** - Push schema changes to database
  - Creates/updates tables based on schema files
  - Use after modifying schema

- **`npm run db:clean`** - Remove all data but keep table structure
  - Deletes all records from all tables
  - Preserves table structure and relationships

### Data Management

- **`npm run db:seed`** - Populate database with sample data
  - Adds test users, movies, genres, directors, rooms, and seats
  - Safe to run multiple times (checks for existing data)

- **`npm run db:fix-types`** - Fix data type inconsistencies
  - Converts serial() to int().primaryKey().autoincrement()
  - Ensures foreign key compatibility

### Development Tools

- **`npm run db:studio`** - Open Drizzle Studio
  - Visual database browser and editor
  - View and edit data through web interface

- **`npm run schema:verify`** - Verify schema integrity
  - Lists all tables and relationships
  - Checks for missing exports

- **`npm run db:generate`** - Generate migration files
  - Creates SQL migration files from schema changes

- **`npm run db:check`** - Check for schema issues
  - Validates schema without applying changes

## Common Workflows

### First Time Setup
```bash
npm run db:setup
```

### After Schema Changes
```bash
npm run db:fix-types
npm run db:push
```

### Reset Everything
```bash
npm run db:reset
npm run db:push
npm run db:seed
```

### Clean Data Only
```bash
npm run db:clean
npm run db:seed
```

## Prerequisites

- MySQL server running
- DATABASE_URL configured in .env file
- All dependencies installed (npm install)

## Troubleshooting

- If foreign key errors occur, run `npm run db:fix-types` first
- If permission errors occur, check MySQL user privileges
- If connection errors occur, verify DATABASE_URL format and MySQL server status
