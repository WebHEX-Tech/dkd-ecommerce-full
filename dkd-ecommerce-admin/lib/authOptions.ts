import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongoDBClient";

interface User {
  id: string;
  username: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db("DKD-ecommerce-admin");

        const user = await db
          .collection("users")
          .findOne({ username: credentials?.username });
        if (!user) {
          throw new Error("No user found with the given username");
        }

        const bcrypt = require("bcrypt");

        const isValidPassword = await bcrypt.compare(
          credentials?.password,
          user?.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          username: user.username,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/auth/sign-in",
  },
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
