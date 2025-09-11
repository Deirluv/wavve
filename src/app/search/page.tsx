"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchResult {
    id: number;
    title: string;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if (!query) return;

        const fakeResults: SearchResult[] = [
            { id: 1, title: "Song 1 matching " + query },
            { id: 2, title: "Song 2 matching " + query },
            { id: 3, title: "Playlist with " + query },
        ];

        setResults(fakeResults);
    }, [query]);

    return (
        <div>
            <h1>Search: &#34;{query}&#34;</h1>
            <ul>
                {results.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}
