"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (step === 1) {
            if (!email) {
                setError("Please enter your email")
                return
            }
            setStep(2)
            return
        }

        if (step === 2) {
            if (password !== confirmPassword) {
                setError("The passwords don't match!")
                return
            }
            setStep(3)
            return
        }

        if (step === 3) {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    displayName,
                }),
            })

            if (res.ok) {
                router.push("/login")
            } else {
                const data = await res.json()
                setError(data.error?.title || "Error while trying to register")
            }
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-6">
            <div className="flex w-[90%] h-[80%] max-w-7xl rounded-2xl overflow-hidden shadow-2xl bg-white">
                {/* Left side — form */}
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

                        <h1 className="mb-6 text-center text-2xl font-semibold">
                            {step === 1
                                ? "Create an account"
                                : step === 2
                                    ? "Create your password"
                                    : "Finish your profile"}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {step === 1 && (
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
                            )}

                            {step === 2 && (
                                <>
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
                                    <div>
                                        <label className="block text-sm mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full rounded bg-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                    </div>

                                    {/* Правила пароля */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full border border-purple-400"></div>
                                            <span>Must contain numbers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full border border-purple-400"></div>
                                            <span>At least 8 characters</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full border border-purple-400"></div>
                                            <span>Password match</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div>
                                        <label className="block text-sm mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            required
                                            className="w-full rounded bg-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                                        />
                                        <label className="text-sm">Your display name can be anything you like. Your name or artist name are good choices</label>
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                className={`w-full rounded py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mt-3 ${
                                    step === 1 && !email
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : step === 2 && (!password || !confirmPassword)
                                            ? "bg-gray-600 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700"
                                }`}
                                disabled={
                                    (step === 1 && !email) ||
                                    (step === 2 && (!password || !confirmPassword))
                                }
                            >
                                {step < 3 ? "Continue" : "Register"}
                            </button>

                            {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
                        </form>
                    </div>
                </div>

                {/*Right side - design*/}

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
                            <Image
                                src="/big_logo.svg"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-4xl font-bold">Your sound. Your wave.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
