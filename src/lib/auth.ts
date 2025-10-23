import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent select_account",
      //   },
      // },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
};

export default NextAuth(authOptions);
