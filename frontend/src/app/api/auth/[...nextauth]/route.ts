import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import axios from "axios";
import { setCookies } from "./set-cookies";

async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null; // No refresh token, force logout

  try {
    const res = await axiosInstance.post("/auth/refresh-token", { refreshToken });


     const authCookies = res.headers['set-cookie']
     await setCookies(authCookies)

    return res.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const handlers = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axiosInstance.post(`/auth/login`, credentials);

            const authCookies = res.headers['set-cookie']
            await setCookies(authCookies)

            return res.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Invalid credentials");
          } else {
            throw new Error("Invalid credentials");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, user };
      }
      return token;
    },
    async session({ session }) {
      const cookieStore = await cookies();
      let accessToken = cookieStore.get("accessToken")?.value;

      if (!accessToken) {
        accessToken = await refreshAccessToken();
      }

      session.accessToken = accessToken;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});

export { handlers as GET, handlers as POST };
