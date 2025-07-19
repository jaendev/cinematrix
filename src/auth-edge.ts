import NextAuth from "next-auth"

// Minum configuration without database for Edge Runtime
export const { auth } = NextAuth({
  providers: [], // Sin providers aquí
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      return session
    },
  }
})