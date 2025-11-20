"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    Loader2,
    Search as SearchIcon,

    MoreVertical
} from 'lucide-react';

import {
    search,
    SearchResultsApiDto,
    SearchTrackDto,
    SearchUserDto,
    SearchPlaylistDto
} from '@/app/api/search/search.api';

// Utility component for scrollable sections
interface ScrollableSectionProps {
    title: string;
    children: React.ReactNode;
    hasMoreThanFive: boolean; // For showing scroll arrows
    notFoundMessage: string; // Message to show if children is empty
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({ title, children, hasMoreThanFive, notFoundMessage }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const childrenArray = React.Children.toArray(children);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const showArrows = hasMoreThanFive;

    return (
        <section className="mb-8 relative">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            
            {showArrows && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -mt-4 transform -translate-y-1/2 bg-gray-900/80 p-2 rounded-full shadow-lg z-10 hover:bg-gray-700 transition hidden md:block"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -mt-4 transform -translate-y-1/2 bg-gray-900/80 p-2 rounded-full shadow-lg z-10 hover:bg-gray-700 transition hidden md:block"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {childrenArray.length === 0 ? (
                <div className="text-gray-500 p-4 border border-gray-800 rounded-lg">
                    {notFoundMessage}
                </div>
            ) : (
                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {children}
                </div>
            )}
        </section>
    );
};

// Track Card

interface TrackListCardProps {
    track: SearchTrackDto;
    index: number;
}

const TrackListCard: React.FC<TrackListCardProps> = ({ track, index }) => {
    const artistName = track.description || 'Unknown Artist';
    const coverUrl = track.previewUrl || '/default_cover.png';

    return (
        <Link href={`/song/${track.id}`} className="block">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition group">
                <span className="w-5 text-right text-sm text-gray-500 group-hover:text-white transition">{index + 1}</span>

                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gray-700">
                    <Image
                        src={coverUrl}
                        alt={track.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-grow min-w-0">
                    <p className="font-medium text-white truncate">{track.title}</p>
                    <p className="text-xs text-gray-400 truncate">{artistName}</p>
                </div>

                <button
                    className="ml-auto p-1 text-gray-500 hover:text-white transition opacity-0 group-hover:opacity-100"
                    onClick={(e) => {e.preventDefault(); e.stopPropagation();}}
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </Link>
    );
};


// User Card

interface ArtistCardProps {
    user: SearchUserDto;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ user }) => {
    const avatar = user.avatarUrl || '/default_pfp.png';

    return (
        <Link href={`/profile/${user.id}`} className="block flex-shrink-0 w-32 group">
            <div className="relative">
                <div
                    className="w-full h-32 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-700 group-hover:border-purple-500 transition-colors duration-300"
                >
                    <Image
                        src={avatar}
                        alt={user.userName}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                </div>


            </div>
            <p className="text-sm mt-2 font-medium text-center truncate">{user.userName}</p>
            <p className="text-xs text-gray-400 text-center">Artist</p>
        </Link>
    );
};


// Playlist Card

interface PlaylistCardProps {
    playlist: SearchPlaylistDto;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    const coverUrl = playlist.coverUrl || '/default_playlist_cover.png';

    return (
        <Link href={`/playlist/${playlist.id}`} className="block flex-shrink-0 w-40 group">
            <div className="relative overflow-hidden rounded-lg bg-gray-700">
                <Image
                    src={coverUrl}
                    alt={playlist.name}
                    width={160}
                    height={160}
                    className="w-40 h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <p className="text-sm mt-2 font-medium truncate text-white">{playlist.name}</p>
            <p className="text-xs text-gray-400 truncate">{playlist.description || 'Playlist'}</p>
        </Link>
    );
};


// Main Page Component

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const [results, setResults] = useState<SearchResultsApiDto>({ tracks: [], users: [], playlists: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            setResults({ tracks: [], users: [], playlists: [] });
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await search(query);
                setResults(data);
            } catch (err) {
                console.error("Search API failed:", err);
                setError((err as Error).message || "Failed to fetch search results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    // State checks
    if (!query) {
        return (
            <main className="min-h-screen text-white p-6 md:p-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                    <SearchIcon className="w-16 h-16 mb-4 text-purple-600" />
                    <p className="text-2xl font-bold">Start Searching</p>
                    <p className="text-md mt-2">Find songs, artists, and playlists.</p>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="min-h-screen text-white p-6 md:p-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                    <Loader2 className="w-12 h-12 mb-4 animate-spin text-purple-600" />
                    <p className="text-xl">Searching for &#34;{query}&#34;...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen text-white p-6 md:p-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6">
                    <AlertTriangle className="w-12 h-12 mb-4" />
                    <p className="text-xl font-bold">Error</p>
                    <p className="text-gray-400 mt-2">{error}</p>
                </div>
            </main>
        );
    }

    // Check for no results
    const hasResults = results.tracks.length > 0 || results.users.length > 0 || results.playlists.length > 0;

    if (!hasResults) {
        return (
            <main className="min-h-screen text-white p-6 md:p-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                    <AlertTriangle className="w-12 h-12 mb-4 text-yellow-500" />
                    <p className="text-2xl font-bold">No Results Found</p>
                    <p className="text-md mt-2">Try searching for something else.</p>
                </div>
            </main>
        );
    }

    // Determine the "Top Result"
    const topResultTrack = results.tracks[0];
    const otherTracks = results.tracks.slice(1);


    return (
        <main className="min-h-screen text-white p-6 md:p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-8">Search Results for &#34;{query}&#34;</h1>

            {/* Top Results and Songs */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                {/* Top Result */}
                {topResultTrack && (
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-white">Top results</h2>
                        <Link href={`/song/${topResultTrack.id}`} className="block">
                            <div
                                style={{ backgroundColor: 'rgba(38, 38, 38, 0.8)' }}
                                className="p-6 rounded-xl shadow-xl hover:opacity-90 transition cursor-pointer h-80 flex flex-col justify-start text-white"
                            >

                                {/* Image */}
                                <div className="w-full h-auto flex-shrink-0 mb-2">
                                    <div className="aspect-square relative overflow-hidden max-w-full max-h-52 rounded-lg">
                                        <Image
                                            src={topResultTrack.previewUrl || '/default_cover.png'}
                                            alt={topResultTrack.title}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                <div className="min-w-0 mt-1">
                                    <p className="text-2xl font-extrabold truncate text-white">{topResultTrack.title}</p>
                                    <p className="text-md font-medium truncate text-gray-300">
                                        <span className="font-light">Song</span> · <span className="font-semibold">{topResultTrack.description || 'Artist'}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Other Songs */}
                <div className={topResultTrack ? "lg:col-span-2" : "lg:col-span-3"}>
                    <h2 className="text-xl font-semibold mb-4 text-white">Songs</h2>

                    {otherTracks.length > 0 ? (
                        <div className="space-y-2">
                            {otherTracks.slice(0, 4).map((track, index) => (
                                <TrackListCard
                                    key={track.id}
                                    track={track}
                                    index={index + 1}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 p-4 border border-gray-800 rounded-lg">
                            {results.tracks.length > 0 ?
                                "No more songs found in search results." :
                                "No songs found."
                            }
                        </div>
                    )}
                </div>
            </section>

            {/* Users */}
            <ScrollableSection
                title="Users"
                hasMoreThanFive={results.users.length > 5}
                notFoundMessage="No Users found."
            >
                {results.users.map((user) => (
                    <ArtistCard key={user.id} user={user} />
                ))}
            </ScrollableSection>

            {/* Playlists */}
            <ScrollableSection
                title="Playlists"
                hasMoreThanFive={results.playlists.length > 5}
                notFoundMessage="No Playlists found."
            >
                {results.playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </ScrollableSection>

        </main>
    );
}