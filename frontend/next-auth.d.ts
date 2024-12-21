import { DefaultSession } from "next-auth";
import { JWT, Session, User } from "next-auth/next";

type Role = admin | user;

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      _id: string;
      firstname: string;
    } & DefaultSession["user"];
  }
  interface User {
    access_token: string;
    role: Role;
  }
  interface JWT {
    access_token: string;
  }
}
