export const {
  DATABASE_URL = process.env.DATABASE_URL!,
  API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000",
  AUTH_SECRET = process.env.AUTH_SECRET!
} = process.env;