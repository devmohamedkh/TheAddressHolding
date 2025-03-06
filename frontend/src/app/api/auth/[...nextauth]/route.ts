import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";


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
          
        }
      },
    }),
  ],
  callbacks: {
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