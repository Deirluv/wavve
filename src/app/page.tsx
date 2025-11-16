import Image from 'next/image';
import Link from 'next/link';

// Utility function to create a simple slug from title and artist
const createSlug = (title: string, artist: string) => {
    return `${title}-${artist}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

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
        {title: "Paint The Town Red", artist: "Doja Cat", img: "https://i.ytimg.com/vi/m4_9TFeMfJE/maxresdefault.jpg"},
        {title: "Jump", artist: "Blackpink", img: "https://i.ytimg.com/vi/CgCVZdcKcqY/maxresdefault.jpg"},
        {title: "Espresso", artist: "Sabrina Carpenter", img: "https://i.ytimg.com/vi/eVli-tstM5E/maxresdefault.jpg"},
    ];

    const communityFavorites: TrackItem[] = [
        {title: "Future Nostalgia", artist: "Dua Lipa", img: "https://i.ytimg.com/vi/UBkNP9lzyrM/maxresdefault.jpg"},
        {title: "HIT ME HARD AND SOFT", artist: "Billie Eilish", img: "https://i.ytimg.com/vi/d846WI05ySU/maxresdefault.jpg"},
        {title: "Ruby", artist: "Jehnny", img: "https://i.ytimg.com/vi/3sB8nZ6x1qA/maxresdefault.jpg"},
        {title: "brat", artist: "Charli XCX", img: "https://i.ytimg.com/vi/09lwcRiG4c4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDemV64K569vrCaSHLrJArElyrAcQ"},
        {title: "Cool with you", artist: "NeneChu", img: "https://i.ytimg.com/vi/zsYSSVoQnP4/maxresdefault.jpg"},
        {title: "Bubble Gum", artist: "newJeans", img: "https://i.ytimg.com/vi/ft70sAYrFyY/maxresdefault.jpg"},
    ];

    const mostCommented: TrackItem[] = [
        {title: "Good Luck, Babe!", artist: "Chappell Roan", img: "https://i.ytimg.com/vi/1RKqOmSkGgM/maxresdefault.jpg"},
        {title: "From The Start", artist: "Laufey", img: "https://i.ytimg.com/vi/lSD_L-xic9o/maxresdefault.jpg"},
        {title: "SLOW DANCING IN THE...", artist: "Joji", img: "https://i.ytimg.com/vi/K3Qzzggn--s/maxresdefault.jpg"},
        {title: "party 4 u", artist: "Charli XCX", img: "https://i.ytimg.com/vi/agu22bqGHto/maxresdefault.jpg"},
        {title: "Kiss It Of Me", artist: "Cigarettes After Sex", img: "https://cdn-images.dzcdn.net/images/cover/5028d62c1e1c82588f67c596b134f618/1900x1900-000000-80-0-0.jpg"},
        {title: "ヲタクノイド", artist: "Yuu Miyashita", img: "https://i.ytimg.com/vi/0ed-QU2g-Q8/sddefault.jpg"},
    ];

    const freshTracks: TrackItem[] = [
        {title: "Illgal", artist: "Rina Sawayama", img: "https://i.ytimg.com/vi/ekauErew4Bs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCklJdRIULOWoRJjHyxEWl8ASVePA"},
        {title: "we can't be friends", artist: "Ariana Grande", img: "https://i.ytimg.com/vi/KNtJGQkC-WI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQj9Y_BHJAxE0U5hQC4NsQxs6TnA"},
        {title: "Levitating", artist: "Dua Lipa", img: "https://i.ytimg.com/vi/TUVcZfQe-Kw/sddefault.jpg"},
        {title: "what would you do?", artist: "Tate McRae", img: "https://i.ytimg.com/vi/GGNXxQOVFm8/maxresdefault.jpg"},
        {title: "Out of Time", artist: "Tate McRae", img: "https://i.ytimg.com/vi/MyydtUrIGpI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgRyhAMA8=&rs=AOn4CLBTmm_tYzu-l0D2tCsasHIXyDP97g"},
        {title: "Illgal", artist: "Rina Sawayama", img: "https://i.ytimg.com/vi/ekauErew4Bs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCklJdRIULOWoRJjHyxEWl8ASVePA"},
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

    const TrackCard = ({item}: {item: TrackItem}) => {
        const trackId = createSlug(item.title, item.artist);
        return (
            // link wrap card
            <Link href={`/song/${trackId}`} passHref>
                <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image src={item.img} alt={item.title} width={150} height={150}
                               className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <p className="text-sm mt-1 font-medium">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.artist}</p>
                </div>
            </Link>
        )
    }

    const HotRightNowCard = ({item}: {item: TrackItem}) => {
        const trackId = createSlug(item.title, item.artist);
        return (
            <Link href={`/song/${trackId}`} passHref>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                    <Image
                        src={item.img}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-semibold">
                        {item.title} - {item.artist}
                    </div>
                </div>
            </Link>
        )
    }

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
                            <HotRightNowCard key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Subscribed to */}
                {isAuth && (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">From those you follow</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {fromFollowedArtists.map((item, i) => (
                                <TrackCard key={i} item={item} /> // Using the reusable TrackCard
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

                {/* Community Favorites */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Community Favorites</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {communityFavorites.map((item, i) => (
                            <TrackCard key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Most Commented  */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Most Commented</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {mostCommented.map((item, i) => (
                            <TrackCard key={i} item={item} />
                        ))}
                    </div>
                </section>

                {/* Fresh Tracks */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Fresh Tracks</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {freshTracks.map((item, i) => (
                            <TrackCard key={i} item={item} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}