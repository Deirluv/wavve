import { NextResponse } from "next/server"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // so that request will be allowed to fetch data from localhost (cuz next.js HTTPS with self-signed certificate)

export async function POST(request: Request) {
    const body = await request.json()
    try {
        const res = await fetch("https://localhost:7108/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
        if (!res.ok) {
            const error = await res.json()
            return NextResponse.json({ error }, { status: res.status })
        }
        const data = await res.json()
        return NextResponse.json(data)
    } catch (e) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
