import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Configuration object for NextAuth.js authentication.
 * @typedef {Object} AuthOptions
 * @property {Object} session - Session configuration.
 * @property {string} session.strategy - The session strategy to use.
 * @property {Object} pages - Custom pages for authentication.
 * @property {string} pages.signIn - The sign-in page URL.
 * @property {string} secret - The secret key for signing the session.
 * @property {Array} providers - The authentication providers to use.
 * @property {Object} callbacks - Callback functions for session and JWT handling.
 * @property {Function} callbacks.session - Callback function for session handling.
 * @property {Function} callbacks.jwt - Callback function for JWT handling.
 */

/**
 * @type {AuthOptions}
 */
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      /**
       * Authorize function for credentials provider.
       * @param {Object} credentials - The user credentials.
       * @param {string} credentials.email - The user email.
       * @param {string} credentials.password - The user password.
       * @param {string} credentials.role - The user role.
       * @returns {Promise<Object|null>} - The user object if authorized, null otherwise.
       */
      authorize: async (credentials) => {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const passwordMatch = user.password === credentials.password;

            if (passwordMatch && user.role === credentials.role) {
              return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile_img: user.profile_img,
              };
            }
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    /**
     * Session callback function.
     * @param {Object} params - The callback parameters.
     * @param {Object} params.session - The current session.
     * @param {Object} params.token - The JWT token.
     * @param {Object} params.user - The user object.
     * @returns {Promise<Object>} - The updated session.
     */
    async session({ session, token, user }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          session.user = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            profile_img: dbUser.profile_img,
          };
        }
        return session;
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * JWT callback function.
     * @param {Object} params - The callback parameters.
     * @param {Object} params.user - The user object.
     * @param {Object} params.token - The JWT token.
     * @returns {Object} - The updated JWT token.
     */
    async jwt({ user, token }) {
      if (user) {
        // Note that this if condition is needed
        token.user = {...user };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
