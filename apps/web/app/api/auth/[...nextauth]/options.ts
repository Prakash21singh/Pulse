import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/prisma/client";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "pulse",
      name: "credentials",
      credentials: {
        indentifier: { label: "Email", placeholder: "Email", type: "email" },
        Password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          //   const user = await prisma.user.findFirst({
          //     where: {
          //       email: credentials?.indentifier,
          //       username: credentials?.indentifier,
          //     },
          //   });

          //   if (!user) {
          //     throw new Error("User haven't logged in yet!!");
          //   }

          //   const isPassCorrect = await bcrypt.compare(
          //     credentials?.Password || "",
          //     user.password
          //   );

          //   if (!isPassCorrect) {
          //     throw new Error("Password Incorrect!!");
          //   }

          //   return {
          //     id: user.id,
          //     username: user.username,
          //     email: user.email,
          //   };
          console.log(credentials);
          return {
            id: "prakashkiid",
            username: "prakash_21",
            email: "prakash@gmail.com",
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.userId = "session me aaya kya";
        token.username = "prakash";
      }
      return token;
    },
    async session({ token, user, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
};
