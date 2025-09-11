import Image from 'next/image';

export default function Home() {
    return (
        <>
            {/* Main Content */}
            <main className="px-6 py-6 max-w-7xl mx-auto">
                {/* Greeting */}
                <div className="mb-6">
                    <h1 className="text-lg font-bold">Hi, Samantha!</h1>
                </div>

                {/* Trending Albums */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Trending albums and singles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="relative group cursor-pointer overflow-hidden rounded-lg">
                                <Image
                                    src={`https://via.placeholder.com/300x300?text=Jump+-+Blackpink`}
                                    alt="Album"
                                    width={300}
                                    height={300}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm">
                                    Jump - Blackpink
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recently Played */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Recently Played</h2>
                        <div className="flex items-center space-x-2">
                            <button className="text-sm text-gray-400 hover:text-white transition">Show All</button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {title: "Agora Hills", artist: "Doja Cat", image: "https://via.placeholder.com/80x80?text=AGORA"},
                            {title: "Perfect Night", artist: "Rina Sawayama", image: "https://via.placeholder.com/80x80?text=PERFECT"},
                            {title: "Toright", artist: "Headphones", image: "https://via.placeholder.com/80x80?text=TORIGHT"},
                            {title: "AMANGARD", artist: "LONDON", image: "https://via.placeholder.com/80x80?text=AMANGARD"},
                            {title: "Cool with you", artist: "NeneChu", image: "https://via.placeholder.com/80x80?text=COOL"},
                            {title: "UNBO", artist: "SPH INN", image: "https://via.placeholder.com/80x80?text=UNBO"},
                            {title: "Bubble Gum", artist: "newJeans", image: "https://via.placeholder.com/80x80?text=BUBBLE"},
                            {title: "Home", artist: "Isabel LaRosa", image: "https://via.placeholder.com/80x80?text=HOME"},
                            {title: "Paint The Town Red", artist: "Doja Cat", image: "https://via.placeholder.com/80x80?text=PAINT"},
                        ].map((item, i) => (
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

                {/* Favorite Artists */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Favorite artists</h2>
                        <div className="flex space-x-2">
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {[
                            {name: "Billie Eilish", img: "https://via.placeholder.com/100x100?text=Billie"},
                            {name: "Hori Caillape", img: "https://via.placeholder.com/100x100?text=Hori"},
                            {name: "Doja Cat", img: "https://via.placeholder.com/100x100?text=Doja"},
                            {name: "Lisa", img: "https://via.placeholder.com/100x100?text=Lisa"},
                            {name: "Tate McRae", img: "https://via.placeholder.com/100x100?text=Tate"},
                            {name: "Dua Lipa", img: "https://via.placeholder.com/100x100?text=Dua"},
                        ].map((artist, i) => (
                            <div key={i} className="flex-shrink-0">
                                <div
                                    className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition">
                                    <Image src={artist.img} alt={artist.name} width={80} height={80}
                                           className="w-full h-full object-cover"/>
                                </div>
                                <p className="text-xs mt-1 text-center">{artist.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Made For You */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Made for You</h2>
                        <div className="flex items-center space-x-2">
                            <button className="text-sm text-gray-400 hover:text-white transition">Show All</button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            {title: "Illgal", artist: "Rina Sawayama", img: "https://via.placeholder.com/150x150?text=ILLGAL"},
                            {title: "Espresso", artist: "Sabrina Carpenter", img: "https://via.placeholder.com/150x150?text=ESPRESSO"},
                            {
                                title: "we can't be friends",
                                artist: "Ariana Grande",
                                img: "https://via.placeholder.com/150x150?text=WECANT"
                            },
                            {title: "Levitating", artist: "Dua Lipa", img: "https://via.placeholder.com/150x150?text=LEVITATING"},
                            {title: "what would you do?", artist: "Tate McRae", img: "https://via.placeholder.com/150x150?text=WHAT"},
                            {title: "Out of Time", artist: "Tate McRae", img: "https://via.placeholder.com/150x150?text=OUT"},
                        ].map((item, i) => (
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

                {/* More Like */}
                <section className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium">More Like</p>
                            <p className="text-purple-500">Ariana Grande</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {[
                            {name: "Lady Gaga", img: "https://via.placeholder.com/100x100?text=Lady"},
                            {name: "Charli XCX", img: "https://via.placeholder.com/100x100?text=Charli"},
                            {name: "Megan Thee Stallion", img: "https://via.placeholder.com/100x100?text=Megan"},
                            {name: "Beyoncé", img: "https://via.placeholder.com/100x100?text=Beyonce"},
                            {name: "Ava Max", img: "https://via.placeholder.com/100x100?text=Ava"},
                            {name: "The Weeknd", img: "https://via.placeholder.com/100x100?text=Weeknd"},
                        ].map((artist, i) => (
                            <div key={i} className="flex-shrink-0">
                                <div
                                    className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition">
                                    <Image src={artist.img} alt={artist.name} width={80} height={80}
                                           className="w-full h-full object-cover"/>
                                </div>
                                <p className="text-xs mt-1 text-center">{artist.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Doja Cat Fans Like */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Doja Cat Fans Like</h2>
                        <div className="flex space-x-2">
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            {
                                title: "HIT ME HARD AND SOFT",
                                artist: "Billie Eilish",
                                img: "https://via.placeholder.com/150x150?text=HITME"
                            },
                            {title: "Short n' Sweet", artist: "Sabrina Carpenter", img: "https://via.placeholder.com/150x150?text=SHORT"},
                            {title: "Ruby", artist: "Jehnny", img: "https://via.placeholder.com/150x150?text=RUBY"},
                            {
                                title: "Good Luck, Babe!",
                                artist: "Chappell Roan",
                                img: "https://via.placeholder.com/150x150?text=GOODLUCK"
                            },
                            {title: "brat", artist: "Charli XCX", img: "https://via.placeholder.com/150x150?text=BRAT"},
                            {title: "Future Nostalgia", artist: "Dua Lipa", img: "https://via.placeholder.com/150x150?text=FUTURE"},
                        ].map((item, i) => (
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

                {/* Playlists for You */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Playlists for You</h2>
                        <div className="flex items-center space-x-2">
                            <button className="text-sm text-gray-400 hover:text-white transition">Show All</button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            {
                                title: "Relaxing Soft Pop",
                                subtitle: "Balancing soft pop",
                                img: "https://via.placeholder.com/150x150?text=RELAXING"
                            },
                            {title: "Today's Pop", subtitle: "Today's pop", img: "https://via.placeholder.com/150x150?text=TODAYS"},
                            {title: "Sad Summer", subtitle: "Sad summer", img: "https://via.placeholder.com/150x150?text=SAD"},
                            {title: "slowncore", subtitle: "slowncore", img: "https://via.placeholder.com/150x150?text=SLOWCORE"},
                            {
                                title: "Champagne Diet",
                                subtitle: "Champagne Diet",
                                img: "https://via.placeholder.com/150x150?text=CHAMPAGNE"
                            },
                            {title: "Pop Hits", subtitle: "Pop Hits", img: "https://via.placeholder.com/150x150?text=POPHITS"},
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image src={item.img} alt={item.title} width={150} height={150}
                                           className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <p className="text-sm mt-1 font-medium">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Haven't Listened In A Long Time */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Haven&#39;t listened in a long time</h2>
                        <div className="flex space-x-2">
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            {
                                title: "Sometimes Saddness",
                                artist: "Lana Del Rey",
                                img: "https://via.placeholder.com/150x150?text=SOMETIMES"
                            },
                            {title: "SLOW DANCING IN THE...", artist: "Joji", img: "https://via.placeholder.com/150x150?text=SLOW"},
                            {title: "ヲタクノイド", artist: "Yuu Miyashita", img: "https://via.placeholder.com/150x150?text=OTAKU"},
                            {title: "From The Start", artist: "Laufey", img: "https://via.placeholder.com/150x150?text=FROM"},
                            {title: "party 4 u", artist: "Charli XCX", img: "https://via.placeholder.com/150x150?text=PARTY"},
                            {
                                title: "Kiss It Of Me",
                                artist: "Cigarettes After Sex",
                                img: "https://via.placeholder.com/150x150?text=KISS"
                            },
                        ].map((item, i) => (
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
            </main>
        </>
    );
}