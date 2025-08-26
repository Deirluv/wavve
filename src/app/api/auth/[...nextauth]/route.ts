import NextAuth, { NextAuthOptions, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials,
                req
            ): Promise<User | null> {
                if (!credentials) {
                    console.log('authorize: no credentials');
                    return null
                }

                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // so that request will be allowed to fetch data from localhost (cuz next.js HTTPS with self-signed certificate)

                console.log("Login credentials:", credentials.email, credentials.password)
                const res = await fetch("https://localhost:7108/api/Auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                })

                console.log('authorize: backend status', res.status, 'content-type:', res.headers.get('content-type'));

                if (!res.ok) {
                    const text = await res.text();
                    console.log('authorize: backend returned non-ok body:', text);
                    return null;
                }

                const data = await res.json()

                try {
                    const decoded = jwt.verify(
                        data.token,
                        process.env.NEXTAUTH_SECRET || "secret"
                    ) as {
                        sub?: string
                        id?: string
                        role: string
                        email: string
                        name?: string
                    }

                    return {
                        id: decoded.sub || decoded.id || "",
                        role: decoded.role,
                        email: decoded.email,
                        name: decoded.name,
                        accessToken: data.token,
                    }
                } catch {
                    return null
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.email = user.email
                token.accessToken = user.accessToken
            }
            return token
        },

        async session({
                          session,
                          token,
                      }: {
            session: Session
            token: JWT
        }): Promise<Session> {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.email = token.email as string
                session.user.accessToken = token.accessToken
            }
            return session
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
