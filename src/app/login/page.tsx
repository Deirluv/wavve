"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        // const res = await fetch("/api/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email, password }),
        // })

        // if (res?.ok) {
        //     router.push("/")
        // } else {
        //     const data = await res?.json()
        //     if (data.error) {
        //         if (data.error.errors) {
        //             const allErrors = Object.values(data.error.errors).flat();
        //             setError(allErrors.join("\n"));
        //         } else {
        //             setError(data.error.title || "Error while trying to login");
        //         }
        //     }
        // }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })



        if (res?.ok) {
            router.push("/")
        } else if (res?.error) {
            setError(res.error)
        } else {
            setError("Error while trying to login")
        }

    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded bg-white p-8 shadow-md"
            >
                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">Login</h1>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                </label>

                <label className="mb-4 block text-sm font-medium text-gray-600">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 focus:outline-none"
                >
                    Login
                </button>

                {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
            </form>
        </main>
    )
}
