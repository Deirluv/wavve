import React from "react";
import Link from "next/link";

const genres = [
    { name: "Pop", image: "https://static01.nyt.com/images/2018/12/30/arts/30yearend-pop2/merlin_147857643_8e0c5c65-4549-4946-b51d-49425b9dcf24-articleLarge.jpg?quality=75&auto=webp&disable=upscale" },
    { name: "Hip-Hop", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaI_FmCE23hhrIHlDZyfzCaZEtswWL7yg2pw&s" },
    { name: "Rock", image: "https://schoolofrock.imgix.net/img/news-article-hero@2x/allstarsdallas050-edit-1677013329.jpg" },
    { name: "New Release", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHdQmHIgxGhZJQzJPaQ1LSW3jCHkqYrfldg&s" },
    { name: "Indie", image: "https://www.hollywoodinsider.com/wp-content/uploads/2021/03/Hollywood-Insider-Indie-and-DIY-Music.jpg" },
    { name: "R&B", image: "https://www.billboard.com/wp-content/uploads/media/greatest-of-all-time-rb-goat-billboard-650.jpg?w=650" },
    { name: "Electronic", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVxFCXV2TXuHp9GgzS8GLvDZ7E6wKKsT8uQ&s" },
    { name: "Folk & Acoustic", image: "https://maxkomusic.com/wp-content/uploads/2017/05/Folk_Acoustic2.jpg" },
    { name: "Latina", image: "https://www.billboard.com/wp-content/uploads/2023/04/feature-state-latin-women-billboard-2023-israel-g-vargas-1548.jpg" },
    { name: "Sleep", image: "https://i1.sndcdn.com/artworks-0DHTJWW649EDv5N2-LkCRnA-t500x500.jpg" },
    { name: "Jazz", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUCwcwzrqSX8MRoUu7_AvEeFcqExzqyuHFw&s" },
    { name: "Metal", image: "https://flypaper.soundfly.com/wp-content/uploads/2016/10/metal-covers-header.png" },
    { name: "Country", image: "https://lasallefalconer.com/wp-content/uploads/2023/10/country-1032x1200.jpeg" },
    { name: "Soul", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Ray_Charles_%281967%29.png" },
    { name: "J-Pop", image: "https://i0.wp.com/yumetwinsblog.wpcomstaging.com/wp-content/uploads/2023/04/Fuji-Kaze-1-1.jpg?resize=620%2C411&ssl=1" },
    { name: "Punk", image: "https://cdn.britannica.com/52/23152-050-08E3FD92/Ramones.jpg" },
    { name: "Funk & Disco", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/James-Brown_1973.jpg/960px-James-Brown_1973.jpg" },
    { name: "Afro", image: "https://dailymusicroll.s3.us-west-2.amazonaws.com/wp-content/uploads/2024/04/05114921/african-percussion%402x.jpg" },
    { name: "Classical", image: "https://aze.media/wp-content/uploads/2021/10/Classical-Music-Wallpaper-e1633331488947.jpeg" },
];

const rowClipPaths = [
    "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)",
    "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
    "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)",
    "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)",
];

export default function GenresPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Genres</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map((genre, index) => {
                    const clipPath = rowClipPaths[index % rowClipPaths.length];

                    let positionClass = "left-2";
                    if (clipPath === rowClipPaths[0] || clipPath === rowClipPaths[3]) {
                        positionClass = "right-2";
                    } else if (clipPath === rowClipPaths[1]) {
                        positionClass = "left-1/2 -translate-x-1/2";
                    } else if (clipPath === rowClipPaths[2]) {
                        positionClass = "left-2";
                    }

                    return (
                        <Link
                            key={genre.name}
                            href={`/genres/${genre.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                            className="relative group overflow-hidden shadow-lg"
                            style={{
                                clipPath: clipPath,
                                borderRadius: "12px",
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
