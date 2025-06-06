import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // authorize: async (credentials) => {
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: credentials?.email as string,
      //       password: credentials?.password as string,
      //     },
      //   });

      //   if (user !== null) {
      //     console.log("success", credentials.email, credentials.password);
      //     return {
      //       id: user.id,
      //       role: user.role,
      //       name: user.name,
      //       email: user.email,
      //       image: user.image,
      //     };
      //   }
      //   throw new Error("Invalid credentials");
      // },
      authorize: async (credentials) => {
        if (credentials?.email && credentials?.password) {
          return {
            id: "1234556",
            role: "ADMIN",
            name: "Test User",
            email: credentials.email as string,
            image: "https://via.placeholder.com/150", // Optional placeholder image
          };
        }
        throw new Error("Missing credentials");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      return session;
    },
  },
});
