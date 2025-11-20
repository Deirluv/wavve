// Home.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    getHotTracks,
    getCommunityFavorites,
    getMostCommented,
    getFreshTracks,
    TrackApiDto
} from '@/app/api/tracks/tracks.api';
import { Disc, AlertTriangle } from 'lucide-react';

type TrackItem = TrackApiDto;

const TrackCard = ({ item }: { item: TrackItem }) => {
    return (
        <Link href={`/song/${item.id}`} passHref>
            <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                    <Image
                        src={item.previewUrl || "/image_icon.png"}
                        alt={item.title}
                        width={150}
                        height={150}
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-sm mt-1 font-medium truncate">{item.title}</p>
                {/* ИСПОЛЬЗУЕМ DESCRIPTION и TRUNCATE */}
                <p className="text-xs text-gray-400 truncate">{item.description || 'No description'}</p>
            </div>
        </Link>
    )
}

const HotRightNowCard = ({ item }: { item: TrackItem }) => {
    return (
        <Link href={`/song/${item.id}`} passHref>
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                    src={item.previewUrl || "/image_icon.png"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-10 group-hover:opacity-10 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-semibold">
                    <span className="truncate block">{item.title}</span>
                    {/* ИСПОЛЬЗУЕМ DESCRIPTION и TRUNCATE */}
                    <span className="text-xs text-gray-300 truncate block">{item.description || 'No description'}</span>
                </div>
            </div>
        </Link>
    )
}


export default function Home() {
    const [hotTracks, setHotTracks] = useState<TrackItem[]>([]);
    const [communityFavorites, setCommunityFavorites] = useState<TrackItem[]>([]);
    const [mostCommented, setMostCommented] = useState<TrackItem[]>([]);
    const [freshTracks, setFreshTracks] = useState<TrackItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAuth = false;

    useEffect(() => {
        const loadFeedData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [
                    hot,
                    favorites,
                    commented,
                    fresh
                ] = await Promise.all([
                    getHotTracks(),
                    getCommunityFavorites(),
                    getMostCommented(),
                    getFreshTracks()
                ]);

                setHotTracks(hot);
                setCommunityFavorites(favorites);
                setMostCommented(commented);
                setFreshTracks(fresh);

            } catch (e) {
                console.error("Error loading feed data:", e);
                setError("Failed to load music feed. Please check the API connection.");
            } finally {
                setIsLoading(false);
            }
        };

        loadFeedData();
    }, []);


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <Disc className="w-10 h-10 animate-spin text-purple-500" />
                <div className="ml-4">Loading music feed...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="max-w-md w-full bg-gray-800 border border-red-700/50 rounded-2xl p-8 text-center shadow-2xl">
                    <div className="flex justify-center mb-4">
                        <AlertTriangle className="w-14 h-14 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Data Loading Error</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition duration-150"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    const EmptySection = ({ title }: { title: string }) => (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="text-gray-400 p-4 border border-gray-700 rounded-lg">
                No tracks found in this category.
            </div>
        </section>
    );

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
                {hotTracks.length > 0 ? (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Hot Right Now</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {hotTracks.map((item) => (
                                <HotRightNowCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ) : <EmptySection title="Hot Right Now" />}

                {/* Community Favorites */}
                {communityFavorites.length > 0 ? (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Community Favorites</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {communityFavorites.map((item) => (
                                <TrackCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ) : <EmptySection title="Community Favorites" />}


                {/* Most Commented  */}
                {mostCommented.length > 0 ? (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Most Commented</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {mostCommented.map((item) => (
                                <TrackCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ) : <EmptySection title="Most Commented" />}

                {/* Fresh Tracks */}
                {freshTracks.length > 0 ? (
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Fresh Tracks</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {freshTracks.map((item) => (
                                <TrackCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ) : <EmptySection title="Fresh Tracks" />}

            </main>
        </>
    );
}