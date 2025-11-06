import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ваш внешний бэкенд

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = params.id;

    try {
        // 1. Creating headers
        const headers = {
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
        };

        // 2. API
        const externalResponse = await fetch(`${apiUrl}/Users/${userId}`, {
            method: 'GET',
            headers: headers,
            cache: 'no-store',
        });

        if (!externalResponse.ok) {
            return NextResponse.json(
                { message: `External API Error: ${externalResponse.statusText}` },
                { status: externalResponse.status }
            );
        }

        const data = await externalResponse.json();

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Internal Server Error fetching profile:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}