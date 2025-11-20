"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Heart, Share2, CornerUpRight, MessageSquare, Pause, AlertTriangle, Disc, Edit, Trash } from 'lucide-react';

import { getTrackById, trackListen, deleteTrack, TrackApiDto } from '@/app/api/tracks/tracks.api';

import { usePlayerStore } from '@/store/Player'
import { useSession } from 'next-auth/react';

import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';


interface SongPageProps {
    params: {
        id: string;
    };
}

const LoadingState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Disc className="w-12 h-12 mb-4 animate-spin text-purple-600" />
        <p className="text-xl">{message}</p>
    </div>
);


export default function SongPage({ params }: SongPageProps) {
    const { id } = params;

    const router = useRouter();
    const { data: session, status } = useSession();
    const CURRENT_USER_ID = session?.user?.id;
    const isAuthenticated = status === 'authenticated';


    const [trackData, setTrackData] = useState<TrackApiDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const playerStore = usePlayerStore();

    const [listenReported, setListenReported] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // does this track in player = this page
    const isThisTrackInPlayer = playerStore.currentTrack?.id === id;
    const isThisTrackPlaying = isThisTrackInPlayer && playerStore.isPlaying;


    // upload track info
    useEffect(() => {
        if (!id) return;

        const fetchTrack = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTrackById(id);
                setTrackData(data);

                // reset listenReported
                setListenReported(false);
            } catch (err) {
                console.error("Error fetching track:", err);
                setError((err as Error).message || "Failed to load track data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrack();
    }, [id]);

    // player
    const handlePlayToggle = useCallback(async () => {
        if (!trackData) return;

        // metadata player
        const trackMetadata = {
            id: trackData.id,
            title: trackData.title,
            artist: trackData.userName,
            cover: trackData.previewUrl || '/default_cover.png',
            fileUrl: trackData.fileUrl,
        };

        if (isThisTrackInPlayer) {
            // if track is already there - play/pause
            playerStore.togglePlay();
        } else {
            // if another track - load and start
            playerStore.setTrack(trackMetadata);
        }

        // logic starts if track first click or next track
        if (!listenReported && !isThisTrackPlaying) {
            try {
                await trackListen(id);
                setListenReported(true);
                // update counter local
                setTrackData(prev => prev ? ({ ...prev, listenCount: prev.listenCount + 1 }) : null);
            } catch (err) {
                console.error("Listen report failed:", err);
            }
        }

    }, [id, trackData, isThisTrackInPlayer, isThisTrackPlaying, listenReported, playerStore]);

    const handleDelete = async () => {
        if (!trackData) return;

        setLoading(true);

        try {
            await deleteTrack(id);

            if (isThisTrackInPlayer) {
                playerStore.setTrack(null);
            }

            setIsDeleteModalOpen(false);

            router.push(`/profile/${CURRENT_USER_ID}`);

            alert(`Track "${trackData.title}" deleted successfully.`);

        } catch (err) {
            console.error("Deletion failed:", err);
            setError((err as Error).message || "Failed to delete track.");
            setLoading(false);
            setIsDeleteModalOpen(false);
        }
    };


    if (loading && !isDeleteModalOpen || status === 'loading') {
        return <LoadingState message="Loading track data..." />;
    }

    if (error || !trackData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="text-xl font-bold">Error</p>
                <p className="text-gray-400 mt-2">{error || "Track not found."}</p>
            </div>
        );
    }

    const isOwner = isAuthenticated && CURRENT_USER_ID === trackData.userId;


    const {
        title,
        userName,
        previewUrl,
        // fileUrl,
        listenCount,
        likes,
        comments,
        description,
        genreName,
        userId
    } = trackData;

    return (
        <main className="min-h-screen text-white">

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                trackTitle={title}
                loading={loading}
            />

            {/* header */}
            <section className="">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6 items-start">

                    {/* cover art */}
                    <div className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden shadow-lg bg-gray-900">
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt={title}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">No Cover</div>
                        )}
                    </div>

                    {/* info and play button */}
                    <div className="flex-grow flex flex-col justify-between h-48 sm:h-64">
                        <div className="flex flex-col">
                            {/* artist link */}
                            <Link
                                href={`/profile/${userId}`}
                                className="text-sm font-medium text-gray-400 hover:text-purple-400 transition mb-1"
                            >
                                {userName}
                            </Link>

                            {/* title */}
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
                                {title}
                            </h1>

                            {/* genre */}
                            <p className="text-sm text-gray-500">
                                Genre: **{genreName}**
                            </p>
                        </div>

                        {/* play button and stats */}
                        <div className="flex items-center space-x-4 mt-auto">
                            <button
                                onClick={handlePlayToggle}
                                className={`flex items-center font-bold py-3 px-6 rounded-full transition text-lg shadow-lg ${
                                    isThisTrackPlaying ? 'bg-gray-600 hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                            >
                                {isThisTrackPlaying ? (
                                    <>
                                        <Pause className="w-6 h-6 mr-2 stroke-white" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-6 h-6 mr-2 stroke-white" />
                                        Play
                                    </>
                                )}
                            </button>
                            <span className="text-sm text-gray-500">
                                **{listenCount.toLocaleString()}** Plays
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* action bar */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex space-x-3 text-sm">
                    {/* like */}
                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <Heart className="w-5 h-5" />
                        <span>Like</span>
                        <span className="text-xs text-gray-500 ml-1">{likes.toLocaleString()}</span>
                    </button>

                    {/* repost */}
                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <CornerUpRight className="w-5 h-5" />
                        <span>Repost</span>
                    </button>

                    {/* share */}
                    <button className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                    </button>

                    {isOwner && (
                        <>
                            {/* Edit Button */}
                            <button
                                onClick={() => router.push(`/edit-track/${id}`)}
                                className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-purple-800 hover:border-purple-600 transition"
                                title="Edit Track Metadata"
                                disabled={loading}
                            >
                                <Edit className="w-5 h-5" />
                                <span>Edit</span>
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex items-center space-x-1 p-2 rounded-full border border-gray-700 text-red-400 hover:bg-red-900/50 hover:border-red-600 transition"
                                title="Delete Track Permanently"
                                disabled={loading}
                            >
                                <Trash className="w-5 h-5" />
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* main */}
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* description */}
                <div className="max-w-4xl">
                    <div className="p-4 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Description</h2>
                        <p className="text-gray-400 whitespace-pre-wrap">
                            {description || "No description provided for this track."}
                        </p>
                    </div>
                </div>

                {/* comment input */}
                <div className="max-w-4xl">
                    <div className="p-4 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Join the Conversation</h2>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
                        <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg text-sm">
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* comments list */}
                <div className="max-w-4xl">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-xl font-semibold mb-4">
                            <MessageSquare className="w-6 h-6 text-gray-500" />
                            <h3>All Comments ({comments.toLocaleString()})</h3>
                        </div>

                        {[...Array(Math.min(comments, 5))].map((_, i) => (
                            <div key={i} className="flex space-x-4 p-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">U{i + 1}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-purple-400">User_{i + 1}</p>
                                    <p className="text-gray-300 text-sm">
                                        This is a comment placeholder. (API only provided comment count, not actual comments).
                                    </p>
                                </div>
                            </div>
                        ))}
                        {comments > 5 && (
                            <p className="text-sm text-gray-500 text-center pt-2">...and {comments - 5} more comments.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}