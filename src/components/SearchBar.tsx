"use client";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleClear = () => setQuery("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        router.push(`/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="w-full max-w-xl">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center bg-black/40 border border-white/40 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Search className="text-white/70 w-5 h-5 mr-3" />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What would you like to listen?"
                        className="flex-1 bg-transparent outline-none text-white placeholder-white/70 font-medium"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="ml-3 text-white/80 hover:text-white transition"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
