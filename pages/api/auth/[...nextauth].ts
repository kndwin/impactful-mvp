import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prismaClient }  from 'common/db'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions = {
	adapter: PrismaAdapter(prismaClient), 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
			httpOptions: {
				timeout: 10_000
			}
    }),
  ],
}
export default NextAuth(authOptions)
