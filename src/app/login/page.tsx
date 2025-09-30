"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

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
        <main className="flex min-h-screen items-center justify-center bg-black p-6">
            <div className="flex w-[90%] h-[80%] max-w-7xl rounded-2xl overflow-hidden shadow-2xl bg-white">
                {/* Left side */}
                <div className="flex w-full md:w-1/2 items-center justify-center bg-black p-8">
                    <div className="w-full max-w-sm text-white min-h-[600px] flex flex-col justify-center">
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <Image
                                    src="/text_logo.svg"
                                    alt="Logo"
                                    width={128}
                                    height={128}
                                />
                            </div>
                        </div>

                        <h1 className="mb-6 text-center text-2xl font-semibold">Log in</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded bg-white/10 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded bg-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full rounded py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mt-3 ${
                                    !email || !password
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700"
                                }`}
                                disabled={!email || !password}
                            >
                                Login
                            </button>

                            {error && (
                                <p className="mt-4 text-center text-sm text-red-400">{error}</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right side */}
                <div className="relative hidden md:flex w-1/2 items-center justify-center overflow-hidden">
                    <Image
                        src="/waves_bg_form.svg"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="relative z-10 text-center text-white space-y-1">
                        <div className="relative mx-auto h-32 w-32">
                            <Image src="/big_logo.svg" alt="Logo" fill className="object-contain" />
                        </div>
                        <p className="text-4xl font-bold">Your sound. Your wave.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
