import NextAuth from "next-auth"
import { AUTH_SECRET } from "../config/config"

// Minum configuration without database for Edge Runtime
export const { auth } = NextAuth({
  providers: [], // Sin providers aquí
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: AUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      return session
    },
  }
})