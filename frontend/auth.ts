import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { LoginResponseData } from "@/lib/definitions";
import { PostRequest } from "./lib/axios/client/axios";

async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<LoginResponseData | undefined> {
  try {
    const res = await PostRequest(`/api/signin`, { email, password }, {});
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  trustHost: true,
  basePath: "/api",
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        console.log(parsedCredentials);

        if (!parsedCredentials.success) throw new Error("Invalid Credentials");
        const { email, password } = parsedCredentials.data;
        // console.log(email || "abc")
        const res = await loginWithEmailAndPassword(email, password);

        if (!res) {
          throw new Error("Invaid Credentials");
        }

        const UserData = {
          id: res.user._id.toString(),
          access_token: res.token,
          firstname: `${res.user.firstname}`,
          lastname: `${res.user.lastname}`,
          email: res.user.email,
          role: res.user.role,
        };
        return UserData;
      },
    }),
  ],
});
