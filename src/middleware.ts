import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
})

export const config = {
    matcher: ["/profile", "/likes", "/playlists", "/tracks", "/feed", "/search", "/upload", ], // "/profile" не забывать вернуть
}