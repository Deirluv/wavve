"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const hasMinLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasUppercase = /[A-Z]/.test(password) // Проверка на заглавную букву
    const passwordsMatch = password === confirmPassword

    const isPasswordValid = hasMinLength && hasNumber && hasUppercase && passwordsMatch

    // form back button
    function handleBack() {
        if (step > 1) {
            setStep(step - 1)
            setError("")
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (step === 1) {
            if (!email) {
                setError("Please enter your email")
                return
            }
            if (!email.includes("@")) {
                setError("Please enter a valid email address.")
                return
            }
            setStep(2)
            return
        }

        if (step === 2) {
            if (!isPasswordValid) {

                if (!hasMinLength) {
                    setError("Password must be at least 8 characters.")
                } else if (!hasNumber) {
                    setError("Password must contain at least one number.")
                } else if (!hasUppercase) {
                    setError("Password must contain at least one uppercase letter.")
                } else if (!passwordsMatch) {
                    setError("The passwords don't match!")
                } else {
                    setError("Password must meet all requirements.")
                }
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
                    userName,
                    password,
                    confirmPassword,
                }),
            })

            if (res.ok) {
                router.push("/login")
            } else {
                const data = await res.json()

                let errorMessage = "Error while trying to register"

                if (data.Messages && Array.isArray(data.Messages) && data.Messages.length > 0) {
                    errorMessage = data.Messages[0]
                } else if (data.error?.title) {
                    errorMessage = data.error.title
                } else if (data.Code) {
                    errorMessage = `Registration failed: ${data.Code}`
                }

                setError(errorMessage)
            }
        }
    }

    // circles purple
    const ValidationItem = ({ condition, text }: { condition: boolean, text: string }) => (
        <div className="flex items-center gap-2">
            <div
                className={`h-3 w-3 rounded-full transition-colors ${
                    condition
                        ? "bg-purple-400 border-purple-400"
                        : "border border-purple-400"
                }`}
            ></div>
            <span>{text}</span>
        </div>
    )


    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-6 font-inter">
            <div
                className="flex w-[90%] h-full max-h-[800px] max-w-7xl rounded-2xl overflow-hidden shadow-2xl bg-white">

                {/* left side — form */}
                <div className="relative flex w-full md:w-1/2 items-center justify-center bg-black p-8">

                    {/* button back */}
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="absolute top-6 left-6 p-2 rounded-full text-white hover:bg-white/10 transition flex items-center group"
                            aria-label="Go back to previous step"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            <span className="ml-2 text-sm">Back</span>
                        </button>
                    )}

                    <div className="w-full max-w-sm text-white min-h-[600px] flex flex-col justify-center">
                        <div className="mb-8 flex justify-center">
                            <div className="relative h-10 w-32">
                                <Image
                                    src="/text_logo.svg"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight">
                            {step === 1
                                ? "Create an Account"
                                : step === 2
                                    ? "Set Up Your Password"
                                    : "Finish Your Profile"}
                        </h1>

                        <p className="text-center text-gray-400 mb-8">
                            Step {step} of 3
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-transparent focus:border-purple-400 transition"
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter a secure password"
                                            className="w-full rounded-lg bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 border border-transparent focus:border-purple-400 transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm
                                            Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Re-enter password"
                                            className="w-full rounded-lg bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 border border-transparent focus:border-purple-400 transition"
                                        />
                                    </div>

                                    {/* purple circles */}
                                    <div className="space-y-2 text-sm text-gray-300 pt-2">
                                        <p className="font-semibold text-white">Password Requirements:</p>
                                        <ValidationItem condition={hasNumber} text="Must contain numbers"/>
                                        <ValidationItem condition={hasUppercase}
                                                        text="Must contain an uppercase letter ('A'-'Z')"/>
                                        <ValidationItem condition={hasMinLength} text="At least 8 characters"/>
                                        <ValidationItem condition={password.length > 0 && passwordsMatch}
                                                        text="Password match"/>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <div className="space-y-2">
                                    <label htmlFor="userName" className="block text-sm font-medium">User
                                        Name</label>
                                    <input
                                        id="userName"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)} // ⭐ ИЗМЕНЕНИЕ: setUserName
                                        required
                                        placeholder="Choose your unique username"
                                        className="w-full rounded-lg bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 border border-transparent focus:border-purple-400 transition mb-2"
                                    />
                                    <p className="text-sm text-gray-400">Your User Name will be your unique identifier.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`w-full rounded-lg py-3 font-semibold transition-all duration-200 shadow-lg ${
                                    (step === 1 && !email) ||
                                    (step === 2 && !isPasswordValid) ||
                                    (step === 3 && !userName)
                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed shadow-none"
                                        : "bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.99]"
                                }`}
                                disabled={
                                    (step === 1 && !email) ||
                                    (step === 2 && !isPasswordValid) ||
                                    (step === 3 && !userName)
                                }
                            >
                                {step < 3 ? "Continue" : "Register and Finish"}
                            </button>

                            {error &&
                                <p className="mt-4 text-center text-sm text-red-400 font-medium bg-red-900/30 p-2 rounded-lg">{error}</p>}
                        </form>
                    </div>
                </div>

                {/*right side - design*/}

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
                                priority
                            />
                        </div>
                        <p className="text-4xl font-bold">Your sound. Your wave.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}