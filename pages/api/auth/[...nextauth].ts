import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        Credentials({
            name: "Credentials",
            id: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" },
            },
            async authorize (credentials){
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                } 

                const user = await prismadb.user.findUnique({
                    where: {
                        email : credentials.email,
                    },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("Email does not exist");
                }
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isValid) {
                    throw new Error("Invalid password");
                }
                return user;
            }
        }), 
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXT_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}); 