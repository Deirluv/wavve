"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Share2, Edit, Play, Heart, Users, Music, List, Link } from 'lucide-react';

// Style constants
const ACCENT_COLOR_CLASS = "text-sc-accent";
const SECONDARY_TEXT_CLASS = "text-sc-tertiary";
const CARD_BG_CLASS = "bg-sc-card-bg";
const BORDER_COLOR_CLASS = "border-sc-tertiary/50";
const ICON_COLOR_CLASS = "text-sc-secondary";

// Test data
const TEST_IMAGES = {
    PROFILE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7n9x9XbO-qBaZc1-kB0ShF1o8XFiQdtzlU3oyEpuDG--ElM0Aus7mwqo78ilVxjHi9U&usqp=CAU",
    RECENT_1: "https://thecircle.de/cdn/shop/articles/sabrina-carpenter-header-1.jpg?v=1726603933",
    RECENT_2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SnQX0dupw_oXQfUC_oeGszGR8W7lVIcDog&s",
    PLAYLIST_1: "https://image.stern.de/33665872/t/IH/v13/w1440/r1.3333/-/dua-lipa-barbie.jpg",
    PLAYLIST_2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNr8htJYmdreoSRcqDgOl7SVUs0kaEiPICg&s",
    LIKE: "https://thecircle.de/cdn/shop/articles/Billie-Eilish-HEADER.jpg?v=1719391383",
    FOLLOWING: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sDdZ6oItg8kPZsiSHS7NEuVTRCqrRkm6RA&s",
};


// Functional components
const RecentTrackCard = ({ track, imageSrc }) => (
    <div className="flex flex-col">
        <img src={imageSrc} alt={track.title} className="w-full aspect-square object-cover rounded-md" />
        <span className="text-sm font-semibold text-white mt-2 truncate">{track.title}</span>
        <span className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{track.artist}</span>
    </div>
);

const PlaylistListItem = ({ playlist, imageSrc }) => (
    <div className="flex items-center space-x-3">
        <div className="w-14 h-14 relative flex-shrink-0">
            <img src={imageSrc} alt={playlist.title} className="w-full h-full object-cover rounded-md" />
            <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 opacity-75 fill-white" />
        </div>
        <div className="flex-grow">
            <span className={`text-xs ${ACCENT_COLOR_CLASS}`}>Playlist</span>
            <h3 className="text-white font-semibold truncate">{playlist.title}</h3>
            <p className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{playlist.description}</p>
        </div>
        <div className={SECONDARY_TEXT_CLASS}>
            &#x22EE;
        </div>
    </div>
);

const LikedTrackItem = ({ track, imageSrc }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition duration-150">
        <img src={imageSrc} alt={track.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
        <div className="flex-grow">
            <p className="text-sm font-semibold truncate">{track.title}</p>
            <p className={`text-xs ${SECONDARY_TEXT_CLASS} truncate`}>{track.artist}</p>
        </div>
        <div className={SECONDARY_TEXT_CLASS}>
            &#x22EE;
        </div>
    </div>
);

const FollowingUserItem = ({ user, imageSrc }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <img src={imageSrc} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className={`text-xs ${SECONDARY_TEXT_CLASS}`}>{user.followers} followers</p>
            </div>
        </div>
        <button className={`text-xs px-3 py-1 border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:${ACCENT_COLOR_CLASS} hover:border-sc-accent transition duration-150`}>
            Following
        </button>
    </div>
);


// Main Component

export default function ProfilePage() {
    const params = useParams();
    const userInUrl = params?.username as string;

    const CURRENT_USER_NICKNAME = "samantha";

    const [currentUser] = useState<string>(CURRENT_USER_NICKNAME); // Наш юзер
    const [profileData, setProfileData] = useState<any>(null);
    const [recentTracks, setRecentTracks] = useState<any[]>([]);
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [likes, setLikes] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);

    useEffect(() => {
        const profileToLoad = (!userInUrl || userInUrl === CURRENT_USER_NICKNAME)
            ? CURRENT_USER_NICKNAME
            : userInUrl;

        if (profileToLoad === CURRENT_USER_NICKNAME) {
            setProfileData({
                username: "samantha",
                displayName: "Samantha Roberts",
                followers: 25,
                following: 30,
                tracks: 0,
                likesCount: 503,
            });

            setRecentTracks([
                { title: "Espresso", artist: "Sabrina Carpenter" },
                { title: "Out of Time", artist: "Tate McRae" },
                { title: "Future Nostalgia", artist: "Dua Lipa" },
                { title: "Levitating", artist: "Dua Lipa" },
                { title: "Physical", artist: "Dua Lipa" },
                { title: "Midnight Sky", artist: "Miley Cyrus" },
                { title: "Hold On", artist: "Justin Bieber" },
                { title: "Drivers License", artist: "Olivia Rodrigo" },
            ]);
            setPlaylists([
                { title: "slowcore", description: "Duster, Cigarettes After Sex…" },
                { title: "Resonance", description: "Adele, Coldplay, Billie Eilish…" },
                { title: "Relaxing soft pop", description: "Adele, Coldplay…" },
                { title: "HOME", description: "BTS" },
                { title: "Home", description: "Matthew Hall" },
            ]);
            setLikes([
                { title: "Hit me Hard and Soft", artist: "Billie Eilish" },
                { title: "I'm Not The Only One", artist: "Sam Smith" },
                { title: "Just The Way You Are", artist: "Bruno Mars" },
            ]);
            setFollowing([
                { name: "Billie Eilish", followers: "3.06M" },
                { name: "The Chainsmokers", followers: "4.5M" },
                { name: "Avicii", followers: "5.1M" },
                { name: "Kygo", followers: "3.9M" },
            ]);

        } else {
            setProfileData({
                username: userInUrl,
                displayName: "Billie Eilish Official",
                followers: "30.5M",
                following: 10,
                tracks: 120,
                likesCount: "1.2M",
            });
            setRecentTracks([
                { title: "LUNCH", artist: "Billie Eilish" },
                { title: "CHIHIRO", artist: "Billie Eilish" },
                { title: "THE DINER", artist: "Billie Eilish" },
                { title: "SKINNY", artist: "Billie Eilish" },
            ]);
            setPlaylists([
                { title: "My Hits", description: "All my best songs" },
                { title: "Collaborations", description: "The Kid Laroi, Khalid..." },
            ]);
            setLikes([
                { title: "Where Are U Now", artist: "Skrillex & Diplo" },
                { title: "Happier Than Ever", artist: "Billie Eilish" },
            ]);
            setFollowing([
                { name: "FINNEAS", followers: "2.5M" },
                { name: "Dua Lipa", followers: "15M" },
            ]);
        }
    }, [userInUrl]);

    if (!profileData) {
        return <div className={`text-center mt-10 ${SECONDARY_TEXT_CLASS}`}>Loading...</div>;
    }

    const isMyProfile = currentUser === profileData.username;

    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-7xl bg-sc-background min-h-screen text-white shadow-2xl">

                {/* Header (Banner and user info) */}
                <header className="relative">
                    {/* Banner */}
                    <div className="w-full h-40 bg-gradient-to-r from-sc-accent/70 to-sc-card-bg/70"></div>

                    {/* Container PFP, name and buttons */}
                    <div className="flex items-end px-6 md:px-10 pb-2">

                        {/* Pfp */}
                        <div className="relative -mt-10 flex-shrink-0">
                            <img
                                src={TEST_IMAGES.PROFILE}
                                alt={profileData.displayName}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-sc-background"
                            />
                        </div>

                        {/* Name */}
                        <div className="ml-6 flex-grow">
                            <h1 className="text-3xl font-bold">{profileData.displayName}</h1>
                            <p className={`${SECONDARY_TEXT_CLASS} mt-1`}>@{profileData.username}</p>
                        </div>

                        {/* Buttons Share/Edit/Follow */}
                        <div className="flex space-x-3 pb-2">
                            {/* Share всегда виден, если это наш профиль или чужой */}
                            <button className={`flex items-center px-4 py-2 text-sm ${CARD_BG_CLASS} border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:bg-white/10 transition duration-150`}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </button>
                            {isMyProfile ? (
                                <button className={`flex items-center px-4 py-2 text-sm ${CARD_BG_CLASS} border ${BORDER_COLOR_CLASS} ${ICON_COLOR_CLASS} rounded-full hover:bg-white/10 transition duration-150`}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </button>
                            ) : (
                                <button className={`flex items-center px-4 py-2 text-sm bg-sc-accent text-white rounded-full hover:opacity-80 transition duration-150`}>
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* Nav (Tabs) */}
                <nav className="flex space-x-6 px-6 md:px-10 py-2 text-sm">
                    {['All', 'Popular tracks', 'Tracks', 'Albums', 'Playlists', 'Reposts'].map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className={`pb-2 transition duration-100 ${index === 0 ? `border-b-2 border-sc-accent text-white` : `${SECONDARY_TEXT_CLASS} hover:text-white`}`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Content (2 Columns) */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:px-10 md:pt-6">
                    {/* Left column (Recent, Playlists) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Recent - Adaptive grid 2x4 */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Recent</h2>
                            {/* No overflow-x-auto, added grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {recentTracks.slice(0, 8).map((track, index) => (
                                    <RecentTrackCard
                                        key={index}
                                        track={track}
                                        imageSrc={index % 2 === 0 ? TEST_IMAGES.RECENT_1 : TEST_IMAGES.RECENT_2}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Playlists */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Playlists</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {playlists.map((playlist, index) => (
                                    <PlaylistListItem
                                        key={index}
                                        playlist={playlist}
                                        imageSrc={index % 2 === 0 ? TEST_IMAGES.PLAYLIST_1 : TEST_IMAGES.PLAYLIST_2}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right column (Stats, Liked Tracks, Following) */}
                    <aside className="lg:col-span-1 space-y-8">

                        {/* Stats (Followers, Following, Tracks) */}
                        <div className={`flex justify-between items-center p-4 ${CARD_BG_CLASS} rounded-lg`}>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{profileData.followers}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{profileData.following}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Following</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-white">{profileData.tracks}</p>
                                <p className={`text-sm ${SECONDARY_TEXT_CLASS}`}>Tracks</p>
                            </div>
                        </div>

                        {/* Likes */}
                        <div className={`${CARD_BG_CLASS} p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">{profileData.likesCount} LIKES</h3>
                                <a href="#" className={`text-sm ${SECONDARY_TEXT_CLASS} hover:text-white`}>Show All</a>
                            </div>
                            <div className="space-y-2">
                                {likes.slice(0, 3).map((track, index) => (
                                    <LikedTrackItem key={index} track={track} imageSrc={TEST_IMAGES.LIKE} />
                                ))}
                            </div>
                        </div>

                        {/* Following */}
                        <div className={`${CARD_BG_CLASS} p-4 rounded-lg`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">{following.length} FOLLOWING</h3>
                                <a href="#" className={`text-sm ${SECONDARY_TEXT_CLASS} hover:text-white`}>Show All</a>
                            </div>
                            <div className="space-y-3">
                                {following.slice(0, 4).map((user, index) => (
                                    <FollowingUserItem key={index} user={user} imageSrc={TEST_IMAGES.FOLLOWING} />
                                ))}
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}