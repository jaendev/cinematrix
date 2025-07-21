
// If you use the configuration DB
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser } from "@/lib/auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // Configuration for the login form
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password"
        }
      },

      // Authentication logic
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Authenticate user
        const user = await authenticateUser(email, password)

        if (user) {
          // Return user object that will be stored in JWT/session
          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isActive: user.isActive,
          }
        }

        // Authentication failed
        return null
      },
    }),
  ],

  // Callbacks to customize JWT and session
  callbacks: {
    async jwt({ token, user }) {
      // If user object exists (only on sign in), add custom fields to token
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.phone = user.phone
        token.isActive = user.isActive
      }
      return token
    },

    async session({ session, token }) {
      // Add custom fields to session from token
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.phone = token.phone as string | null
        session.user.isActive = token.isActive as boolean
      }
      return session
    },
  },

  // Pages configuration
  pages: {
    signIn: '/login', // Custom login page
  },

  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for sessions (good for serverless)
    maxAge: 24 * 60 * 60, // 1 day
  },

})
