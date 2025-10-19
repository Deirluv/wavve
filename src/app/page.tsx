import Image from 'next/image';

interface TrackItem {
    title: string;
    artist: string;
    img: string;
}

interface LikedTrackItem {
    title: string;
    artist: string;
    image: string;
}

interface ArtistItem {
    name: string;
    img: string;
}


export default function Home() {
    const isAuth = false;

    const hotRightNowTracks: TrackItem[] = [
        {title: "Paint The Town Red", artist: "Doja Cat", img: "https://via.placeholder.com/300x300?text=Hot+1"},
        {title: "Jump", artist: "Blackpink", img: "https://via.placeholder.com/300x300?text=Hot+2"},
        {title: "Espresso", artist: "Sabrina Carpenter", img: "https://via.placeholder.com/300x300?text=Hot+3"},
    ];

    const communityFavorites: TrackItem[] = [
        {title: "Future Nostalgia", artist: "Dua Lipa", img: "https://via.placeholder.com/150x150?text=Fav+1"},
        {title: "HIT ME HARD AND SOFT", artist: "Billie Eilish", img: "https://via.placeholder.com/150x150?text=Fav+2"},
        {title: "Ruby", artist: "Jehnny", img: "https://via.placeholder.com/150x150?text=Fav+3"},
        {title: "brat", artist: "Charli XCX", img: "https://via.placeholder.com/150x150?text=Fav+4"},
        {title: "Cool with you", artist: "NeneChu", img: "https://via.placeholder.com/150x150?text=Fav+5"},
        {title: "Bubble Gum", artist: "newJeans", img: "https://via.placeholder.com/150x150?text=Fav+6"},
    ];

    const mostCommented: TrackItem[] = [
        {title: "Good Luck, Babe!", artist: "Chappell Roan", img: "https://via.placeholder.com/150x150?text=Comm+1"},
        {title: "From The Start", artist: "Laufey", img: "https://via.placeholder.com/150x150?text=Comm+2"},
        {title: "SLOW DANCING IN THE...", artist: "Joji", img: "https://via.placeholder.com/150x150?text=Comm+3"},
        {title: "party 4 u", artist: "Charli XCX", img: "https://via.placeholder.com/150x150?text=Comm+4"},
        {title: "Kiss It Of Me", artist: "Cigarettes After Sex", img: "https://via.placeholder.com/150x150?text=Comm+5"},
        {title: "ヲタクノイド", artist: "Yuu Miyashita", img: "https://via.placeholder.com/150x150?text=Comm+6"},
    ];

    const freshTracks: TrackItem[] = [
        {title: "Illgal", artist: "Rina Sawayama", img: "https://via.placeholder.com/150x150?text=Fresh+1"},
        {title: "we can't be friends", artist: "Ariana Grande", img: "https://via.placeholder.com/150x150?text=Fresh+2"},
        {title: "Levitating", artist: "Dua Lipa", img: "https://via.placeholder.com/150x150?text=Fresh+3"},
        {title: "what would you do?", artist: "Tate McRae", img: "https://via.placeholder.com/150x150?text=Fresh+4"},
        {title: "Out of Time", artist: "Tate McRae", img: "https://via.placeholder.com/150x150?text=Fresh+5"},
        {title: "Illgal", artist: "Rina Sawayama", img: "https://via.placeholder.com/150x150?text=Fresh+6"},
    ];

    const recentlyLiked: LikedTrackItem[] = [
        {title: "Toright", artist: "Headphones", image: "https://via.placeholder.com/80x80?text=LIKED+1"},
        {title: "AMANGARD", artist: "LONDON", image: "https://via.placeholder.com/80x80?text=LIKED+2"},
        {title: "Agora Hills", artist: "Doja Cat", image: "https://via.placeholder.com/80x80?text=LIKED+3"},
        {title: "Perfect Night", artist: "Rina Sawayama", image: "https://via.placeholder.com/80x80?text=LIKED+4"},
        {title: "UNBO", artist: "SPH INN", image: "https://via.placeholder.com/80x80?text=LIKED+5"},
    ];

    const fromFollowedArtists: TrackItem[] = [
        {title: "New Track by Billie", artist: "Billie Eilish", img: "https://via.placeholder.com/150x150?text=Follow+1"},
        {title: "Fresh Beat by Doja", artist: "Doja Cat", img: "https://via.placeholder.com/150x150?text=Follow+2"},
        {title: "Mixtape by Lisa", artist: "Lisa", img: "https://via.placeholder.com/150x150?text=Follow+3"},
        {title: "Latest Tune by Dua", artist: "Dua Lipa", img: "https://via.placeholder.com/150x150?text=Follow+4"},
        {title: "The Collab", artist: "Tate McRae", img: "https://via.placeholder.com/150x150?text=Follow+5"},
        {title: "B-Side", artist: "Hori Caillape", img: "https://via.placeholder.com/150x150?text=Follow+6"},
    ];

    const favoriteArtists: ArtistItem[] = [
        {name: "Billie Eilish", img: "https://via.placeholder.com/100x100?text=Billie"},
        {name: "Hori Caillape", img: "https://via.placeholder.com/100x100?text=Hori"},
        {name: "Doja Cat", img: "https://via.placeholder.com/100x100?text=Doja"},
        {name: "Lisa", img: "https://via.placeholder.com/100x100?text=Lisa"},
        {name: "Tate McRae", img: "https://via.placeholder.com/100x100?text=Tate"},
        {name: "Dua Lipa", img: "https://via.placeholder.com/100x100?text=Dua"},
    ];


    return (
        <>
            {/* Main Content */}
            <main className="px-6 py-6 max-w-7xl mx-auto">
                {/* Greeting */}
                <div className="mb-6">
                    <h1 className="text-lg font-bold">
                        {isAuth ? "Hi, Samantha!" : "Welcome!"}
                    </h1>
                </div>

                {/* Hot right now */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Hot Right Now</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {hotRightNowTracks.map((item, i) => (
                            <div key={i} className="relative group cursor-pointer overflow-hidden rounded-lg">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm">
                                    {item.title} - {item.artist}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* ------------------------------------------------------------------ */}

                {/* Subscribed to */}
                {isAuth && (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">From those you follow</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {fromFollowedArtists.map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-lg">
                                        <Image src={item.img} alt={item.title} width={150} height={150}
                                               className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <p className="text-sm mt-1 font-medium">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.artist}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recently liked */}
                {isAuth && (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Recently liked</h2>
                            <div className="flex items-center space-x-2">
                                <button className="text-sm text-gray-400 hover:text-white transition">Show all</button>
                                <button
                                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {recentlyLiked.map((item, i) => (
                                <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition">
                                    <Image src={item.image} alt={item.title} width={60} height={60} className="rounded-md"/>
                                    <div>
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-xs text-gray-400">{item.artist}</p>
                                    </div>
                                    <button className="ml-auto text-gray-500 hover:text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Your favorite artists */}
                {isAuth && (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your favorite artists</h2>
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {favoriteArtists.map((artist, i) => (
                                <div key={i} className="flex-shrink-0">
                                    <div
                                        className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition">
                                        <Image src={artist.img} alt={artist.name} width={112} height={112}
                                               className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-xs mt-1 text-center">{artist.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* ------------------------------------------------------------------ */}

                {/* Community Favorites */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Community Favorites</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {communityFavorites.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image src={item.img} alt={item.title} width={150} height={150}
                                           className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <p className="text-sm mt-1 font-medium">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* ------------------------------------------------------------------ */}

                {/* Most Commented  */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Most Commented</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {mostCommented.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image src={item.img} alt={item.title} width={150} height={150}
                                           className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <p className="text-sm mt-1 font-medium">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* ------------------------------------------------------------------ */}

                {/* Fresh Tracks */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Fresh Tracks</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {freshTracks.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image src={item.img} alt={item.title} width={150} height={150}
                                           className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <p className="text-sm mt-1 font-medium">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* ------------------------------------------------------------------ */}
            </main>
        </>
    );
}