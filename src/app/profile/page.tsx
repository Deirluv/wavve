"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const params = useParams();
    const username = params?.username as string;

    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<any>(null);
    const [recentTracks, setRecentTracks] = useState<any[]>([]);
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [likes, setLikes] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);

    useEffect(() => {
        setCurrentUser("samantha");
        setProfileData({
            username,
            displayName: username === "samantha" ? "Samantha Roberts" : "Other User",
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
            { title: "Espresso", artist: "Sabrina Carpenter" },
            { title: "Out of Time", artist: "Tate McRae" },
            { title: "Future Nostalgia", artist: "Dua Lipa" },
            { title: "Levitating", artist: "Dua Lipa" },
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
            { name: "Billie Eilish", followers: "3.06M" },
            { name: "Billie Eilish", followers: "3.06M" },
        ]);
    }, [username]);

    if (!profileData) {
        return <div className="text-center mt-10 text-gray-400">Loading...</div>;
    }

    const isMyProfile = currentUser === profileData.username;

    return (
        <div className="max-w-screen-xl mx-auto text-white">
            {/* Banner */}
            <div className="relative">
                <div className="w-full h-56 bg-gray-300"></div>
                {/* Pfp on banner */}
                <div className="absolute left-6 bottom-[-60px]">
                    <div className="w-40 h-40 rounded-full bg-gray-400 border-4 border-black"></div>
                </div>
            </div>

            {/* Name */}
            <div className="mt-20 ml-6">
                <h1 className="text-3xl font-bold">{profileData.displayName}</h1>
                <p className="text-gray-400">@{profileData.username}</p>
            </div>

            {/* Tabs */}
            <div className="mt-4 ml-6 flex space-x-4 text-gray-400">
                <button className="hover:text-white">All</button>
                <button className="hover:text-white">Popular tracks</button>
                <button className="hover:text-white">Tracks</button>
                <button className="hover:text-white">Albums</button>
                <button className="hover:text-white">Playlists</button>
                <button className="hover:text-white">Reposts</button>
            </div>

            {/* Content */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                {/* Left */}
                <div className="md:col-span-2 space-y-8">
                    {/* Recent */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Recent</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {recentTracks.map((track, idx) => (
                                <div key={idx} className="rounded-lg">
                                    <div className="w-full h-32 bg-gray-600 rounded-lg mb-2"></div>
                                    <p className="font-semibold">{track.title}</p>
                                    <p className="text-sm text-gray-400">{track.artist}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Playlists */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Playlists</h2>
                        <div className="space-y-3">
                            {playlists.map((pl, idx) => (
                                <div key={idx} className="flex items-center space-x-3 mb-5">
                                    <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                                    <div>
                                        <p className="font-semibold">{pl.title}</p>
                                        <p className="text-sm text-gray-400">{pl.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="space-y-8">
                    {/* Followers / Following / Tracks */}
                    <div className="flex justify-between bg-gray-800 rounded-lg p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{profileData.followers}</p>
                            <p className="text-gray-400 text-sm">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{profileData.following}</p>
                            <p className="text-gray-400 text-sm">Following</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{profileData.tracks}</p>
                            <p className="text-gray-400 text-sm">Tracks</p>
                        </div>
                    </div>

                    {/* Likes */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">{profileData.likesCount} Likes</h2>
                        <div className="space-y-3">
                            {likes.map((like, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
                                    <div>
                                        <p className="font-semibold">{like.title}</p>
                                        <p className="text-sm text-gray-400">{like.artist}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Following */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">{following.length} Following</h2>
                        <div className="space-y-3">
                            {following.map((f, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold">{f.name}</p>
                                            <p className="text-sm text-gray-400">{f.followers} followers</p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-gray-700 text-sm rounded-lg hover:bg-gray-600">
                                        Following
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
