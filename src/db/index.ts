import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

// TODO: move this code from a Config file to an environment variable
const db = drizzle(process.env.DATABASE_URL || "http://localhost:3306");
