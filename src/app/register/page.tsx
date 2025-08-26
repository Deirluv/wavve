"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("The passwords don't match!")
            return
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, userName: username, password, confirmPassword }),
        })

        if (res.ok) {
            router.push("/login")
        } else {
            const data = await res.json()
            if (data.error) {
                if (data.error.errors) {
                    const allErrors = Object.values(data.error.errors).flat();
                    setError(allErrors.join("\n"));
                } else {
                    setError(data.error.title || "Error while trying to register");
                }
            }
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded bg-white p-8 shadow-md"
            >
                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">Register</h1>

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

                <label className="mb-2 block text-sm font-medium text-gray-600">
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                </label>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                </label>

                <label className="mb-4 block text-sm font-medium text-gray-600">
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 focus:outline-none"
                >
                    Register
                </button>

                {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
            </form>
        </main>
    )
}
