import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    username?: string;
  }

  interface Session {
    user: {
      userId?: string;
      username?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    username?: string;
    email?: string;
  }
}
