import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export default NextAuth({
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async session({ session, user, token }) {
			session.role = user.role;
			session.user_id = user.id;

			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId:
				"559985844705-ica1dtqkj6s6nncbjjs099ga7s1g3i4q.apps.googleusercontent.com",
			clientSecret: "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",
		}),
	],
});
