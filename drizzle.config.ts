import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './config/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'mysql',
  dbCredentials: {
    url: DATABASE_URL!,
  },
});
