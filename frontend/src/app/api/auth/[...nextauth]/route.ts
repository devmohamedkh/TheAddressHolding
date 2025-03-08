import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
<<<<<<< HEAD
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
=======
import axios from "axios";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";

>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a

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
<<<<<<< HEAD
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
=======
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials, { withCredentials: true });
         
          console.log(response.data);
          const { accessToken , id} = response.data;

          return { accessToken, id: '50' };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              throw new Error(error.response.data.message || "Invalid credentials");
            } else {
              throw new Error("Invalid credentials");
            }
          
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
        }
      },
    }),
  ],
  callbacks: {
<<<<<<< HEAD
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
=======
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token  }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
        accessToken: token.accessToken,
      };
    },

  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  
});
export { handlers as GET, handlers as POST }
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
