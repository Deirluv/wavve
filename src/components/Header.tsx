// components/Header.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { User, Heart, List, Music } from "lucide-react";
import { createPortal } from "react-dom";
// 👈 ИМПОРТ ИЗМЕНЕН: используем useSession и signOut
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    // 🚀 НОВАЯ ЛОГИКА АВТОРИЗАЦИИ: используем useSession()
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';
    // ----------------------------------------------------

    // Удалены:
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // useEffect(() => {
    //     const token = localStorage.getItem("auth_token");
    //     setIsAuthenticated(!!token);
    //     setIsAuthenticated(false); // Заменено на логику useSession
    // }, []);


    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null); // avatar
    const menuContainerRef = useRef<HTMLDivElement | null>(null); // portal menu
    const [menuCoords, setMenuCoords] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node | null;
            // if click avatar - dont close
            if (menuButtonRef.current && menuButtonRef.current.contains(target)) return;
            // if click inside the portal - dont close
            if (menuContainerRef.current && menuContainerRef.current.contains(target)) return;
            // then close
            setMenuOpen(false);
        }

        // listening "click" so onClick on elements menu finished earlier
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const tabs = [
        { name: "Home", path: "/" },
        { name: "Explore", path: "/explore" },
        { name: "Feed", path: "/feed" },
    ];

    const toggleMenu = () => {
        if (!menuOpen && menuButtonRef.current) {
            const rect = menuButtonRef.current.getBoundingClientRect();
            // absolute transition body
            const offsetX = -180;
            setMenuCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX + offsetX,
            });
        }
        setMenuOpen((prev) => !prev);
    };

    // ⚠️ Добавлено: Отображение заглушки во время загрузки сессии
    if (isLoading) {
        return (
            <header className="bg-black relative z-10">
                <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} className="h-6 w-auto" />
                        <div className="ml-1 w-[350px]">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="text-gray-400">Loading user info...</div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-black relative z-10">
            <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-start">
                <div className="flex items-center space-x-6">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="h-6 w-auto hover:opacity-80 transition"
                    />

                    <nav className="hidden md:flex space-x-6">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.path}
                                className={`relative font-semibold text-base px-2 transition-colors hover:text-gray-300 ${
                                    pathname === tab.path ? "text-white" : "text-gray-400"
                                }`}
                            >
                                {tab.name}
                                {pathname === tab.path && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="ml-1 w-[350px]">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex items-center space-x-8 ml-10">
                    {/* 🚀 ИСПОЛЬЗУЕМ isAuthenticated ИЗ useSession() */}
                    {isAuthenticated ? (
                        <>
                            <button className="text-base font-semibold hover:text-purple-400 transition">
                                Try Artist Pro
                            </button>
                            <button className="text-base font-semibold hover:text-gray-300 transition">
                                For Artists
                            </button>
                            <Link
                                href="/upload"
                                className="text-base font-semibold hover:text-gray-300 transition"
                            >
                                Upload
                            </Link>

                            <div className="relative">
                                <button
                                    ref={menuButtonRef}
                                    onClick={toggleMenu}
                                    className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center hover:bg-gray-600"
                                >
                                    {/* Можно использовать session.user.image, если он есть */}
                                    <Image
                                        src={session?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7n9x9XbO-qBaZc1-kB0ShF1o8XFiQdtzlU3oyEpuDG--ElM0Aus7mwqo78ilVxjHi9U&usqp=CAU"}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="object-cover w-10 h-10"
                                    />
                                </button>

                                {menuOpen &&
                                    createPortal(
                                        <div
                                            // This wrapper is a portal. We attach a ref to it to know if a click was made inside it
                                            ref={menuContainerRef}
                                            className="absolute w-52 rounded-xl shadow-lg bg-neutral-900 text-white ring-1 ring-gray-700 z-50"
                                            style={{
                                                position: "absolute",
                                                top: menuCoords.top,
                                                left: menuCoords.left,
                                            }}
                                        >
                                            <div className="py-2">
                                                <button
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        router.push("/profile");
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-800 w-full text-left"
                                                >
                                                    <User strokeWidth={2} />
                                                    Profile
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        router.push("/likes");
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-800 w-full text-left"
                                                >
                                                    <Heart strokeWidth={2} />
                                                    Likes
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        router.push("/playlists");
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-800 w-full text-left"
                                                >
                                                    <List strokeWidth={2} />
                                                    Playlists
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        router.push("/tracks");
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-800 w-full text-left"
                                                >
                                                    <Music strokeWidth={2} />
                                                    Tracks
                                                </button>

                                                {/* 🚀 Добавлено: Кнопка выхода с использованием signOut() */}
                                                <div className="border-t border-gray-700 my-2"></div>
                                                <button
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        signOut({ callbackUrl: '/' }); // Выход и перенаправление на главную
                                                    }}
                                                    className="px-4 py-2 text-sm text-red-400 hover:bg-neutral-800 w-full text-left"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>,
                                        document.body
                                    )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* 🚀 ДЛЯ НЕАВТОРИЗОВАННОГО */}
                            <Link
                                href="/login"
                                className="text-base font-semibold hover:text-purple-400 transition"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="text-base font-semibold hover:text-purple-400 transition"
                            >
                                Create Account
                            </Link>
                            <Link
                                href="/upload"
                                className="text-base font-semibold hover:text-gray-300 transition"
                            >
                                Upload
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}