import 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken: string;
        user: {
            id: string
            role: string
            accessToken: string
            email: string
            name?: string | null
            image?: string | null
        }
    }

    interface User {
        id: string
        role: string
        email: string
        accessToken: string
        image?: string | null
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
        accessToken: string
        image?: string | null
        name?: string | null
        email: string
    }
}