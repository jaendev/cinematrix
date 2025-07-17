# Database Scripts Documentation

This directory contains scripts to manage the Cinema database with comprehensive movie catalog.

## Available Scripts

### Core Database Operations

- **`npm run db:setup`** - Complete database setup (recommended for first time)
  - Runs all necessary steps in order: fix types, reset, push schema, seed data, verify
  - Creates 20 movies, 15 directors, 10 genres, 4 theaters with complete relationships

- **`npm run db:reset`** - Drop and recreate the database
  - Completely removes all data and tables
  - Creates a fresh empty database

- **`npm run db:push`** - Push schema changes to database
  - Creates/updates tables based on schema files
  - Use after modifying schema definitions

- **`npm run db:clean`** - Remove all data but keep table structure
  - Deletes all records from all tables in dependency order
  - Preserves table structure and relationships

### Data Management

- **`npm run db:seed`** - Populate database with comprehensive sample data
  - **20 movies** from different decades (1990-2021)
  - **15 directors** with diverse backgrounds
  - **10 genres** covering major film categories
  - **4 theaters** with different capacities and VIP sections
  - **4 sample users** for testing
  - **Complete many-to-many relationships** between movies, genres, and directors
  - **448 seats** across all theaters
  - Safe to run multiple times (checks for existing data)

- **`npm run db:fix-types`** - Fix data type inconsistencies
  - Converts serial() to int().primaryKey().autoincrement()
  - Ensures foreign key compatibility between tables
  - Required when changing primary key definitions

### Development Tools

- **`npm run db:studio`** - Open Drizzle Studio
  - Visual database browser and editor
  - View and edit data through web interface
  - Browse relationships and table structure

- **`npm run schema:verify`** - Verify schema integrity
  - Lists all 31 exported tables and relationships
  - Checks for missing exports and circular dependencies

- **`npm run db:generate`** - Generate migration files
  - Creates SQL migration files from schema changes

- **`npm run db:check`** - Check for schema issues
  - Validates schema without applying changes

### Verification and Debugging

- **`npm run db:check-relations`** - Verify relationship data integrity
  - Counts movies, genres, directors, and their relationships
  - Shows sample relationship data with IDs
  - Useful for debugging foreign key issues

- **`npm run db:show-relations`** - Display movies with their relationships
  - Shows each movie with its assigned genres
  - Shows each movie with its director
  - Provides summary statistics
  - Human-readable relationship overview

## Sample Data Overview

### Movies (20 total)
- **Action**: Inception, The Dark Knight, Black Panther, Dune
- **Drama**: Goodfellas, Nomadland, Lady Bird, The Departed
- **Sci-Fi**: Blade Runner 2049, Interstellar, Arrival, Jurassic Park
- **Thriller**: Get Out, Knives Out, Parasite
- **Comedy**: Baby Driver, Lady Bird (dual genre)
- **Horror**: Get Out
- **Fantasy**: Wonder Woman, The Shape of Water
- **Crime**: Pulp Fiction, Django Unchained
- **Romance**: The Shape of Water
- **Adventure**: Dune, Black Panther, Wonder Woman

### Directors (15 total)
- Christopher Nolan (Inception, The Dark Knight, Interstellar)
- Quentin Tarantino (Pulp Fiction, Django Unchained)
- Martin Scorsese (Goodfellas, The Departed)
- Denis Villeneuve (Dune, Arrival)
- Plus 11 other acclaimed directors

### Theaters
- **Theater 1**: 120 seats (15 rows)
- **Theater 2**: 80 seats (10 rows)
- **IMAX Theater**: 200 seats (25 rows, first 3 rows VIP)
- **VIP Theater**: 48 seats (6 rows, all VIP)

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

### Verify Relationships
```bash
npm run db:check-relations
npm run db:show-relations
```

### Development Workflow
```bash
# Make schema changes
npm run db:fix-types    # Fix any type issues
npm run db:push         # Apply changes
npm run schema:verify   # Verify schema
npm run db:studio       # Visual inspection
```

## Database Schema Overview

### Core Tables
- **users** - Customer accounts and profiles
- **movies** - Film catalog with metadata
- **genres** - Film categories
- **directors** - Filmmaker information
- **rooms** - Theater rooms and capacities
- **seats** - Individual seat assignments

### Relationship Tables
- **movie_genres** - Many-to-many: movies ↔ genres
- **movie_directors** - Many-to-many: movies ↔ directors

### Business Logic Tables
- **showtimes** - Scheduled film screenings
- **orders** - Purchase transactions
- **order_items** - Items within purchases
- **tickets** - Cinema admission tickets
- **movie_purchases** - Digital movie rentals/purchases
- **reviews** - User movie ratings and reviews
- **wishlists** - User movie wishlists

## Relationship Examples

```
Inception (2010)
├── Genres: Action, Sci-Fi, Thriller
├── Director: Christopher Nolan
├── Price: $12.99
└── Rating: PG-13

Parasite (2019)
├── Genres: Drama, Comedy, Thriller
├── Director: Bong Joon-ho
├── Price: $14.99
└── Rating: R
```

## Prerequisites

- MySQL server running
- DATABASE_URL configured in .env file
- All dependencies installed (`npm install`)
- Node.js with TypeScript support

## Troubleshooting

### Foreign Key Errors
```bash
npm run db:fix-types    # Fix type inconsistencies
npm run db:reset        # Reset database
npm run db:push         # Recreate tables
```

### Permission Errors
- Check MySQL user privileges
- Verify DATABASE_URL format: `mysql://user:password@host:port/database`

### Connection Errors
- Verify MySQL server is running
- Check DATABASE_URL environment variable
- Test connection with mysql CLI

### Missing Relationships
```bash
npm run db:check-relations  # Verify data exists
npm run db:show-relations   # Human-readable overview
npm run db:studio          # Visual inspection
```

### Schema Issues
```bash
npm run schema:verify      # Check exports
npm run db:check          # Validate schema
```

## File Structure

```
scripts/
├── README.md              # This documentation
├── reset-db.ts           # Database reset utility
├── seed.ts               # Comprehensive sample data
├── clean-db.ts           # Data cleanup utility
├── fix-types.ts          # Type consistency fixer
├── setup-db.ts           # One-command setup
├── verify-schema.ts      # Schema validation
├── check-relations.ts    # Relationship verification
└── show-movie-relations.ts # Human-readable relations
```

## Environment Variables

Required in `.env` file:
```bash
DATABASE_URL="mysql://username:password@localhost:3306/cinematrix"
```

## Next Steps

After successful database setup:
1. Implement API routes for movie catalog
2. Create user authentication system
3. Build showtime management
4. Develop booking and payment system
5. Add review and rating features
