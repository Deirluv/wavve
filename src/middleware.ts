import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token && token.role === "admin",
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
})

export const config = {
    matcher: ["/"],
}