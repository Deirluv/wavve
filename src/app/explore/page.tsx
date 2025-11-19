import React from "react";
import Link from "next/link";

const genres = [
    { name: "Pop", image: "/explore/1.png" },
    { name: "Hip-Hop", image: "/explore/2.png" },
    { name: "Rock", image: "/explore/3.png" },
    { name: "New Release", image: "/explore/4.png" },
    { name: "Indie", image: "/explore/5.png" },
    { name: "R&B", image: "/explore/6.png" },
    { name: "New Release", image: "/explore/7.png" },
    { name: "Indie", image: "/explore/8.png" },
    { name: "Electronic", image: "/explore/9.png" },
    { name: "Folk & Acoustic", image: "/explore/10.png" },
    { name: "Latina", image: "/explore/11.png" },
    { name: "Sleep", image: "/explore/12.png" },
    { name: "Jazz", image: "/explore/13.png" },
    { name: "Metal", image: "/explore/14.png" },
    { name: "Country", image: "/explore/15.png" },
    { name: "Soul", image: "/explore/16.png" },
    { name: "J-Pop", image: "/explore/17.png" },
    { name: "Punk", image: "/explore/18.png" },
    { name: "Funk & Disco", image: "/explore/19.png" },
    { name: "Afro", image: "/explore/20.png" },
    { name: "Classical", image: "/explore/21.png" },
];

export default function GenresPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Genres</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map((genre, index) => {
                    const styleIndex = index % 3;

                    let clipPathValue = "";
                    let positionClass = "";

                    if (styleIndex === 0) {
                        clipPathValue = "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)";
                        positionClass = "right-2";
                    } else if (styleIndex === 1) {
                        clipPathValue = "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)";
                        positionClass = "left-1/2 -translate-x-1/2";
                    } else {
                        clipPathValue = "polygon(0% 20%, 20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)";
                        positionClass = "left-2";
                    }

                    return (
                        <Link
                            key={genre.name}
                            href={`/genres/${genre.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                            className="relative group overflow-hidden shadow-lg block bg-zinc-800"
                            style={{
                                clipPath: clipPathValue,
                                borderRadius: "16px",
                            }}
                        >
                            <img
                                src={genre.image}
                                alt={genre.name}
                                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                            />
                            <span
                                className={`absolute bottom-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${positionClass}`}
                            >
                                <span className="w-3 h-3 border-2 border-purple-500 rounded-full flex-shrink-0"></span>
                                {genre.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}